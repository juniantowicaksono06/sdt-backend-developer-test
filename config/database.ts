import { Sequelize } from 'sequelize'

const db = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
    host: process.env.DB_HOST as string,
    port: (parseInt((process.env.DB_PORT as string)) || 3306) as number,
    dialect: "mysql"
})

export default db