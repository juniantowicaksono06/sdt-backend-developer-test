interface UserType {
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    location_id: number
}

interface UserEventType {
    user_id: number,
    event_id: number,
    event_initial_date?: string
}

type EventInputType = {
    event_type: string,
    initial_date?: string
}

type EventNameType = "BIRTHDAY" | "ANNIVERSARY"

interface EventQueueType {
    user_id: number,
    event_id: number,
    event_date: string,
    timezone_name: string,
    full_name: string,
    email: string,
    event_name: EventNameType,
    message: string
}

export { UserType, UserEventType, EventInputType, EventQueueType, EventNameType }