import axios from 'axios'
class EventFactory {
    private message: string
    private email: string
    constructor(message: string = "", email: string = "") {
        this.message = message
        this.email = email
    }

    setMessage(message: string = "") {
        this.message = message
    }

    setEmail(email: string = "") {
        this.email = email
    }

    async broadcastEmail() {
        const data = {
            message: this.message,
            email: this.email
        }
    
        const response = await axios.post(`${process.env.EMAIL_SERVICE}/send-email`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.status == 200
    }
}

export default EventFactory