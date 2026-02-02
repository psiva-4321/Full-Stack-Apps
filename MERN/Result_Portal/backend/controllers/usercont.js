const um = require("../models/usermodel")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
let add = async (req, res) => {
    try {
        let obj = await um.findById(req.body._id)
        if (obj) {
            res.json({ "msg": "account exists with given email" })
        }
        else {
            let pwdhash = await bcrypt.hash(req.body.pwd, 10)
            let data = new um({ ...req.body, "pwd": pwdhash })
            await data.save()
            res.json({ "msg": "account created" })
        }

    }
    catch {
        res.json({ "msg": "error in reg" })
    }
}

let login = async (req, res) => {
    try {
        let obj = await um.findById(req.body._id)
        if (obj) {
            let f = await bcrypt.compare(req.body.pwd, obj.pwd)
            if (f) {
                res.json({ "token": jwt.sign({ "_id": obj._id }, "1234"), "name": obj.name, "role": obj.role, "_id": obj._id })
            }
            else {
                res.json({ "msg": "check pwd" })
            }

        }
        else {
            res.json({ "msg": "check email" })
        }

    }
    catch {
        res.json({ "msg": "error in login" })
    }
}

let gethno = async (req, res) => {
    try {
        let data = await um.find({ "role": "user" }, { "hno": 1, "_id": 0 })
        res.json(data)
    }
    catch {
        res.json({ "msg": "error in getting hno" })
    }
}
let getdet = async (req, res) => {
    try {
        let data = await um.find({ "hno": req.params.hno })
        res.json(data)
    }
    catch {
        res.json({ "msg": "error in gettingdet" })
    }
}
let updmarks = async (req, res) => {
    try {
        await um.findByIdAndUpdate({
            "_id": req.body._id

        }, { "marks": req.body.marks })
        res.json({ "msg": "marks updated" })
    }
    catch {
        res.json({ "msg": "error in upd marks" })
    }
}

let getdata = async (req, res) => {
    try {
        let data = await um.find({ "role": "user" }, { "pwd": 0 })
        res.json(data)
    }
    catch {
        res.json({ "msg": "error in getting det" })
    }
}
let del = async (req, res) => {
    try {
        await um.findByIdAndDelete(req.params.uid)
        res.json({ "msg": "del done" })

    }
    catch {
        res.json({ "msg": "error in det" })
    }
}
let search = async (req, res) => {
    try {
        if (/^[0-9]{6}$/.test(req.params.data)) {
            let results = await um.find({ "hno": req.params.data })

            res.json(results)
        }
        else {
            let results = await um.find({ $or: [{ "_id": req.params.data }, { "phno": req.params.data }] })

            res.json(results)
        }
    }
    catch (err) {
        console.log(err)
        res.json([])
    }
}

module.exports = { add, login, gethno, getdet, updmarks, getdata, del, search }