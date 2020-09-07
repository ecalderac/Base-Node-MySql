const Sequelize = require('sequelize')
const db = require("../database/database.js")


module.exports = db.sequelize.define(
    'usuarios', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        rut: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.INTEGER
        },
        rol: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    }
)