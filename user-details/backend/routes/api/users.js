const express = require("express");

const router = express.Router();

const uuid = require("uuid");

let users = require("../../data/users");



router.get("/", (req, res) => {

    res.json(users);

});



router.get("/:id", (req, res) => {

    const detected = users.some(user => user.id === parseInt(req.params.id));



    if (detected) {

        res.json(users.filter(user => user.id === parseInt(req.params.id)));

    } else {

        res.sendStatus(400);

    }

});



router.post("/", (req, res) => {

    const newUser = {

        id: uuid.v4(),

        firstName: req.body.firstName,

        lastName: req.body.lastName,

        email: req.body.email,

        contact: req.body.contact

    };


    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.contact) {

        return res.sendStatus(400);

    }

    users.push(newUser);

    res.json(users);

});

//Update User

router.put("/:id", (req, res) => {

    const detected = users.some(user => user.id === req.params.id);

    if (detected) {

        const updateUser = req.body;

        users.forEach(user => {

            if (user.id === req.params.id) {

                user.firstName = updateUser.firstName ? updateUser.firstName : user.firstName;

                user.lastName = updateUser.lastName ? updateUser.lastName : user.lastName;

                user.email = updateUser.email ? updateUser.email : user.email;

                user.contact = updateUser.contact ? updateUser.contact : user.contact;

                res.json({ msg: "User updated", user });

            }

        });

    } else {

        res.sendStatus(400);

    }

});



//Delete User

router.delete("/:id", (req, res) => {

    const detected = users.some(user => user.id === String(req.params.id))

    if (detected) {

        users = users.filter(user => user.id !== String(req.params.id))

        res.json({

            msg: "User deleted",

            users

        });

    } else {

        res.sendStatus(400);

    }

});

module.exports = router;