import EventFactory from './EventBroadcastFactory'

class AnniversaryBroadcast extends EventFactory {
    constructor() {
        super([], 'ANNIVERSARY')
    }
}

export default AnniversaryBroadcast