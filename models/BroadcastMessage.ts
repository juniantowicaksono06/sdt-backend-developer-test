import { DataTypes } from "sequelize"
import db from "../config/database"
import User from "./Users"
import Event from "./Events"
import Sequelize from "sequelize"

const BroadCastMessage = db.define('user_event', {
    broadcast_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    broadcast_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'broadcast_message'
})

BroadCastMessage.belongsTo(User, {
    foreignKey: 'user_id'
})

BroadCastMessage.belongsTo(Event, {
    foreignKey: 'event_id'
})

User.hasMany(BroadCastMessage, {
    foreignKey: 'user_id'
})

Event.hasMany(BroadCastMessage, {
    foreignKey: 'event_id'
})

export default BroadCastMessage