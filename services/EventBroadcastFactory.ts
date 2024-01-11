import {EventNameType, EventQueueType} from '../typings'

import { Sequelize, QueryTypes } from 'sequelize';
import db from '../config/database'
import { sleep, makeJsonRequest } from '../utils/helper';
import BroadCastMessage from '../models/BroadcastMessage';
import moment from 'moment-timezone'

class EventFactory {
    private queue: Array<EventQueueType>
    private eventName: EventNameType
    private sleepTime: number
    constructor(queue: Array<EventQueueType> = [], eventName: EventNameType = "BIRTHDAY", sleepTime: number = 5000) {
        this.queue = queue
        this.eventName = eventName
        this.sleepTime = sleepTime
    }

    setQueue(queue: Array<EventQueueType>) {
        this.queue = queue
    }

    setSleepTime(sleepTime: number) {
      this.sleepTime = sleepTime
    }

    appendQueue(queue: EventQueueType) {
      this.queue = [...this.queue, {...queue}]
    }

    async getEventData(): Promise<Array<EventQueueType> | null> {
      try {
          const rawQuery = `
          SELECT u.user_id, e.event_id, ue.event_initial_date AS event_date, t.timezone_name, CONCAT(u.first_name, " ", IFNULL(u.last_name, '')) AS full_name, 
            email, e.event_name, e.message 
          FROM users u
            LEFT JOIN locations l ON l.location_id = u.location_id
            LEFT JOIN timezones t ON t.timezone_id = l.timezone_id
            RIGHT JOIN user_event ue ON ue.user_id = u.user_id
            LEFT JOIN events e ON ue.event_id = e.event_id
          WHERE (
            MONTH(ue.event_initial_date) <= MONTH(CONVERT_TZ(CURRENT_TIMESTAMP(), CONCAT("+", DATE_FORMAT(TIMEDIFF(NOW(), UTC_TIMESTAMP), '%H:%i')), SUBSTRING_INDEX(t.timezone_name, 'UTC', -1)))
            AND DAY(ue.event_initial_date) <= DAY(CONVERT_TZ(CURRENT_TIMESTAMP(), CONCAT("+", DATE_FORMAT(TIMEDIFF(NOW(), UTC_TIMESTAMP), '%H:%i')), SUBSTRING_INDEX(t.timezone_name, 'UTC', -1))) 
          )
            AND e.broadcast_on <= CONVERT_TZ(CURTIME(), CONCAT("+", DATE_FORMAT(TIMEDIFF(NOW(), UTC_TIMESTAMP), '%H:%i')), SUBSTRING_INDEX(t.timezone_name, 'UTC', -1)) 
            AND e.event_name = '${this.eventName}'
            AND (
              SELECT COUNT(broadcast_at) FROM broadcast_message 
              WHERE event_id = e.event_id 
                AND YEAR(broadcast_at) = YEAR(CONVERT_TZ(CURRENT_TIMESTAMP(), CONCAT("+", DATE_FORMAT(TIMEDIFF(NOW(), UTC_TIMESTAMP), '%H:%i')), SUBSTRING_INDEX(t.timezone_name, 'UTC', -1))) 
                AND MONTH(broadcast_at) <= MONTH(CONVERT_TZ(CURRENT_TIMESTAMP(), CONCAT("+", DATE_FORMAT(TIMEDIFF(NOW(), UTC_TIMESTAMP), '%H:%i')), SUBSTRING_INDEX(t.timezone_name, 'UTC', -1))) 
                AND DAY(broadcast_at) <= DAY(CONVERT_TZ(CURRENT_TIMESTAMP(), CONCAT("+", DATE_FORMAT(TIMEDIFF(NOW(), UTC_TIMESTAMP), '%H:%i')), SUBSTRING_INDEX(t.timezone_name, 'UTC', -1))) 
                AND user_id = u.user_id
            ) = 0;
        `
      
        return await db.query(rawQuery, {
          type: QueryTypes.SELECT
        })
      } catch(error) {
        return null
      }
    }

    // Function to broadcast email
    async broadcastEmail(useLoop: boolean = true) {
      do {
        const queue: EventQueueType | undefined = this.queue.length > 0 ? this.queue[0] : undefined
        if(queue === undefined) {
          await sleep(this.sleepTime)
          continue
        }
        while(true) {
          // Send email via API call with axios
          try {
            const response = await makeJsonRequest("POST", `${process.env.EMAIL_SERVICE}/send-email`, {
              email: queue.email,
              message: queue.message.replace("{full_name}", queue.full_name)
            })
            if(response.status == 200) {
              const transaction = await db.transaction()
              try {
                const broadcastDate = moment().tz(`${queue.timezone_name}`)
                await BroadCastMessage.create({
                  user_id: queue.user_id,
                  event_id: queue.event_id,
                  message: queue.message.replace("{full_name}", queue.full_name),
                  broadcast_at: broadcastDate.format('YYYY-MM-DD HH:mm:ss').toString()
                }, {
                  transaction: transaction
                })
                this.queue.shift()
                transaction.commit()
                break
              }
              catch(error) {
                transaction.rollback()
                console.log(error)
              }
            }
          }
          catch(error) {
            console.log(error)
          }
          await sleep(this.sleepTime)
        }
        await sleep(this.sleepTime)
      }
      while(useLoop)
    }

    // Queueing the new event data
    async queueing(useLoop: boolean = true) {
      do {
        // Get new data based on sleepTime variable
        const newData: Array<EventQueueType> | null = await this.getEventData()
        if(newData != null) {
          // If the queue is zero or empty just set the queue
          if(this.queue.length == 0) {
            this.setQueue(newData)
          }
          // Else if the queue has record appends it
          else {
            newData.some((q: EventQueueType) => {
              const result = this.queue.find((obj: EventQueueType) => obj.user_id === q.user_id)?.user_id || null;
              if(result === null) {
                this.appendQueue(q)
              }
            })
          }
          await sleep(this.sleepTime)
        }
      }
      while(useLoop)
    }

    async run(useLoop: boolean = true) {
      this.broadcastEmail(useLoop)
      this.queueing(useLoop)
    }
}

export default EventFactory