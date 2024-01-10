import { DataTypes } from "sequelize"
import db from "../config/database"
import Location from "./Locations"
import Sequelize from "sequelize"

const Timezone = db.define('timezones', {
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


Timezone.belongsTo(Location, {
    foreignKey: "timezone_id"
})

Location.hasOne(Location, {
    foreignKey: "timezone_id"
})

export default Timezone