const express = require("express")
const usuarios = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const Usuario = require("../models/Usuario")
usuarios.use(cors())
const atob = require('atob')


//CREAR USUARIO(ok)
usuarios.post("/registro", (req, res) => {

    const usuario = JSON.parse(req.body.usuario)

    const usuarioData = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: atob(usuario.password),
        rut: usuario.rut,
        telefono: usuario.telefono,
        rol: usuario.rol,
        estado: 'Activo'
    }
    Usuario.findOne({
            where: {
                email: usuario.email
            }
        })
        .then(usuario => {
            if (!usuario) {
                const hash = bcrypt.hashSync(usuarioData.password, 10)
                usuarioData.password = hash
                Usuario.create(usuarioData)
                    .then(usuario => {
                        let token = jwt.sign(usuario.dataValues, process.env.SEED, {
                            expiresIn: 1440
                        })
                        res.json({
                            usuario,
                            token: token
                        })
                    })
                    .catch(error => {
                        res.send('error ' + error)
                    })
            } else {
                res.json({ error: 'Usuario ya registrado' })
            }
        })
        .catch(error => {
            res.send('error ' + error)
        })
})

//EDITAR USUARIO
usuarios.put("/editar/:id", (req, res) => {

    const usuario = JSON.parse(req.body.usuario)

    const usuarioData = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: atob(usuario.password),
        rut: usuario.rut,
        telefono: usuario.telefono,
        rol: usuario.rol,
        estado: usuario.estado
    }
    Usuario.findByPk(req.params.id)
        .then(usuario => {
            //const hash = bcrypt.hashSync(usuarioData.password,10)
            //usuarioData.password = hash
            Usuario.update(usuarioData, { where: { id: req.params.id } })
                .then(filasUpdate => {
                    res.json({
                        filas: filasUpdate
                    })
                })
                .catch(error => {
                    res.send('error ' + error)
                })
        })
        .catch(error => {
            res.send('error ' + error)
        })
})

//LOGIN
usuarios.post('/login', (req, res) => {
    //var atob = require('atob')
    const usuario1 = JSON.parse(req.body.usuario)
    const passCrypt = atob(usuario1.password)
    usuario1.password = passCrypt
    Usuario.findOne({
            where: {
                email: usuario1.email,
                estado: 'Activo'
            },
            include: {
                model: Rol,
                as: 'role'
            },
        })
        .then(usuario => {
            if (usuario) {
                if (bcrypt.compareSync(usuario1.password, usuario.password)) {
                    let token = jwt.sign(usuario.dataValues, process.env.SEED, {
                        expiresIn: "1d"
                    })
                    res.json({ token: token })
                } else {
                    res.send('Contraseña Incorrecta!')
                }
            } else {
                res.send('Usuario no existe!')
            }

        })
        .catch(error => {
            res.send('error: ' + error)
        })
})

//OBTENER USUARIOS ACTIVOS
usuarios.get('/obtener', (req, res) => {
    Usuario.findAll({
            where: { estado: 'Activo' },
            include: {
                model: Rol,
                as: 'role'
            },
            order: [
                ['id', 'DESC']
            ]
        })
        .then(usuarios => {
            res.json({ usuarios: usuarios })
        })
        .catch(error => {
            res.send('error: ' + error)
        })
})

//OBTENER USUARIOS INACTIVOS
usuarios.get('/obtener-inactivo', (req, res) => {
    Usuario.findAll({
            where: { estado: 'Inactivo' },
            include: {
                model: Rol,
                as: 'role'
            },
            order: [
                ['id', 'DESC']
            ]
        })
        .then(usuarios => {
            res.json({ usuariosInactivos: usuarios })
        })
        .catch(error => {
            res.send('error: ' + error)
        })
})

//ELIMINAR USUARIO
usuarios.delete('/eliminar/:id', (req, res) => {
    Usuario.update({ estado: 'Inactivo' }, { where: { id: req.params.id } })
        .then(filasUpdate => {
            res.json({ filas: filasUpdate })
        })
        .catch(error => {
            res.send('error: ' + error)
        })
})

//ACTIVAR USUARIO
usuarios.delete('/activar/:id', (req, res) => {
    Usuario.update({ estado: 'Activo' }, { where: { id: req.params.id } })
        .then(filasUpdate => {
            res.json({ filas: filasUpdate })
        })
        .catch(error => {
            res.send('error: ' + error)
        })
})

module.exports = usuarios