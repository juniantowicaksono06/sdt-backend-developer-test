import { DataTypes } from "sequelize"
import db from "../config/database"
import Locations from "./Locations"
import Sequelize from "sequelize"

const Timezones = db.define('timezones', {
    timezone_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    timezone_name: {
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


Timezones.belongsTo(Locations, {
    foreignKey: "timezone_id"
})

Locations.hasOne(Locations, {
    foreignKey: "timezone_id"
})

export default Timezones