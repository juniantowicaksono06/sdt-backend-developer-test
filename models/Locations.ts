import { DataTypes } from "sequelize"
import db from "../config/database"
import User from "./Users"
import Sequelize from "sequelize"

const Locations = db.define('locations', {
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    location_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timezone_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
}, {
    timestamps: false
})

Locations.belongsTo(User, {
    foreignKey: "location_id"
})

User.hasOne(Locations, {
    foreignKey: "location_id"
})

export default Locations