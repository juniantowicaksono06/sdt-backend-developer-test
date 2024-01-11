import { DataTypes } from "sequelize"
import db from "../config/database"
import User from "./Users"
import Event from "./Events"
import Sequelize from "sequelize"

const UserEvent = db.define('user_event', {
    user_event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    event_initial_date: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 'user_event'
})

UserEvent.belongsTo(User, {
    foreignKey: 'user_id'
})

UserEvent.belongsTo(Event, {
    foreignKey: 'event_id'
})

User.hasMany(UserEvent, {
    foreignKey: 'user_id'
})

Event.hasMany(UserEvent, {
    foreignKey: 'event_id'
})

export default UserEvent