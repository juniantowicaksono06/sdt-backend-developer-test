interface UserType {
    id?: number,
    first_name: string,
    last_name: string,
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

export { UserType, UserEventType, EventInputType }