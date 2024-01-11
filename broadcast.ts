// import Birthday from "./services/Birthday";
import { Sequelize, Op } from "sequelize";
import UserEvent from "./models/UserEvent";
import Locations from "./models/Locations";
import Events from "./models/Events";
import Users from "./models/Users";
import Timezones from "./models/Timezones";

const query = async () => {
    const result = await UserEvent.findAll({
        attributes: [
          [
            Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.fn('IFNULL', Sequelize.col('last_name'), '')),
            'full_name'
          ],
          'email',
          'location_name',
          [
            Sequelize.fn('SUBSTRING_INDEX', Sequelize.col('timezone_name'), 'UTC', -1),
            'timezone'
          ],
          'event_initial_date',
        ],
        include: [
          {
            model: Users,
            attributes: [],
            include: [
              {
                model: Locations,
                attributes: [],
                include: [
                  {
                    model: Timezones,
                    attributes: [],
                  },
                ],
              },
            ],
          },
          {
            model: Events,
            attributes: [],
            where: {
              event_name: 'BIRTHDAY',
              broadcast_on: {
                [Op.lte]: Sequelize.fn(
                  'CONVERT_TZ',
                  Sequelize.fn('CURTIME'),
                  Sequelize.fn(
                    'CONCAT',
                    '+',
                    Sequelize.fn(
                      'DATE_FORMAT',
                      Sequelize.fn(
                        'TIMEDIFF',
                        Sequelize.fn('NOW'),
                        Sequelize.fn('UTC_TIMESTAMP')
                      ),
                      '%H:%i'
                    )
                  ),
                  Sequelize.fn(
                    'SUBSTRING_INDEX',
                    Sequelize.col('locations.timezone_name'),
                    'UTC',
                    -1
                  )
                ),
              },
            },
          },
        ],
        where: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('MONTH', Sequelize.col('event_initial_date')),
              {
                [Op.lte]: Sequelize.fn(
                  'MONTH',
                  Sequelize.fn(
                    'CONVERT_TZ',
                    Sequelize.fn('CURRENT_TIMESTAMP'),
                    Sequelize.fn(
                      'CONCAT',
                      '+',
                      Sequelize.fn(
                        'DATE_FORMAT',
                        Sequelize.fn(
                          'TIMEDIFF',
                          Sequelize.fn('NOW'),
                          Sequelize.fn('UTC_TIMESTAMP')
                        ),
                        '%H:%i'
                      )
                    ),
                    Sequelize.fn(
                      'SUBSTRING_INDEX',
                      Sequelize.col('locations.timezone_name'),
                      'UTC',
                      -1
                    )
                  )
                ),
              },
            ),
            Sequelize.where(
              Sequelize.fn('DAY', Sequelize.col('event_initial_date')),
              {
                [Op.lte]: Sequelize.fn(
                  'DAY',
                  Sequelize.fn(
                    'CONVERT_TZ',
                    Sequelize.fn('CURRENT_TIMESTAMP'),
                    Sequelize.fn(
                      'CONCAT',
                      '+',
                      Sequelize.fn(
                        'DATE_FORMAT',
                        Sequelize.fn(
                          'TIMEDIFF',
                          Sequelize.fn('NOW'),
                          Sequelize.fn('UTC_TIMESTAMP')
                        ),
                        '%H:%i'
                      )
                    ),
                    Sequelize.fn(
                      'SUBSTRING_INDEX',
                      Sequelize.col('locations.timezone_name'),
                      'UTC',
                      -1
                    )
                  )
                ),
              },
            ),
          ],
        },
        having: Sequelize.literal(
          'COUNT(broadcast_message.broadcast_at) = 0'
        ),
        raw: true,
        group: ['users.user_id'],
    });
    console.log(result)
}

query()
