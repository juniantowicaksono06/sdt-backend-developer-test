import EventFactory from './EventBroadcastFactory'

class BirthdayBroadcast extends EventFactory {
    constructor() {
        super([], 'BIRTHDAY')
    }
}

export default BirthdayBroadcast