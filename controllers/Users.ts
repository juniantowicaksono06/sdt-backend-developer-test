import { Request, Response, NextFunction } from "express-serve-static-core";
import Boom from '@hapi/boom';
import Joi, {ValidationResult} from "@hapi/joi";
import { returnSuccess } from "../utils/response";
import Location from "../models/Locations";
import db from "../config/database";
import User from "../models/Users";
import { EventInputType, UserEventType, UserType } from "../typings";
import { Transaction } from "sequelize";
import Events from "../models/Events";
import UserEvent from "../models/UserEvent";

// Function to Create User
const Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Create Schema for Input Validation
        const schema = Joi.object({
            first_name: Joi.string().max(200).required(),
            last_name: Joi.string().max(200).required(),
            location: Joi.string().max(255).required(),
            event: Joi.array().items(Joi.object({
                event_type: Joi.string().required(),
                initial_date: Joi.date().iso().required()
            }))
        })

        let data = req.body
        const {error, value} = schema.validate(data) as ValidationResult

        // Validating input
        if(error) {
            return next(Boom.badRequest(error.details.map(i => i.message).join(',')));
        }

        const userLocation = await Location.findOne({
            where: {
                location_name: data['location']
            }
        })

        // Check the location if it's exists in database?
        if(userLocation === null) {
            return next(Boom.notFound("Location is not found"))
        }

        const locationId = userLocation.get()['location_id']
        var userId: number;
        const transaction = await db.transaction()
        try {
            // Create data
            const userData: UserType = {
                first_name: data['first_name'],
                last_name: data['last_name'],
                location_id: locationId
            }
            // Insert User data
            const newUser = await User.create({
                ...userData
            }, {
                transaction: transaction
            })
            userId = newUser.get('user_id') as number

            // Check if the request has event array?
            if("event" in data) {
                // Get Event Name
                const eventData = data['event'] as Array<EventInputType>
                // Loop the event from user input
                for(const eventDataItem of eventData) {   
                    const event = await Events.findOne({
                        where: {
                            event_name: eventDataItem['event_type']
                        }
                    })
                    // Check if event is exists? if not reutrn Event is not found
                    if(event == null) {
                        transaction.rollback()
                        return next(Boom.notFound(`Event ${eventDataItem['event_type']} is not valid`))
                    }
                    // If event is exists create the user event data
                    const eventId: number = event!.get()['event_id']
                    const userEventData: UserEventType = {
                        event_id: eventId,
                        user_id: userId
                    }
                    if("initial_date" in value) {
                        userEventData['event_initial_date'] = value['initial_date']
                    }
                    await UserEvent.create({...userEventData}, {
                        transaction: transaction
                    })
                }
            }
            await transaction.commit()

            return returnSuccess(200, res)
        }
        catch(error) {
            await transaction.rollback()
            throw new Error(error as string)
        }



    } catch (error: any) {
        return next(Boom.badImplementation(error))
    }
}

// Function to Delete User
const Delete = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId)
    if(isNaN(userId)) {
        return next(Boom.notFound("User is not found!"))
    }
    const transaction = await db.transaction()
    try {
        const user = await User.findOne({
            where: {
                user_id: userId
            }
        })
        if(user == null) {
            return next(Boom.notFound("User not found!"))
        }
        await User.destroy({
            where: {
                user_id: userId
            }
        })
        await transaction.commit()
        return returnSuccess(200, res, "User deleted")
    }
    catch(error: any) {
        await transaction.rollback()
        return next(Boom.badImplementation(error))
    }
}

export { Create, Delete }