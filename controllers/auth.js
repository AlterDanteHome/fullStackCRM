const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorHandlert = require('../utils/errorHandler')
const UserModel = require('../models/User');
const key = require('../config/keys')
module.exports.login = async function (req, res) {
    const candidate = await UserModel.findOne({email: req.body.email});
    if(candidate){
        const passwwordResult = bcrypt.compareSync(req.body.password,candidate.password);
        if(passwwordResult){
            const token=jwt.sign({
                email: candidate.email,
                userId: candidate._id,
                date: Date.now()

            },key.jwt,{expiresIn: 60 * 60});
            res.status(200).json({
                token:`Bearer ${token}`
            })
        }else {
            res.status(401).json({
                messadge:'Пароли не совпадают'
            })
        }
    }else{
        res.status(404).json({
            messadge:'Пользователь не найден'
        })
    }
};
module.exports.register = async function (req, res) {
    const candidate = await UserModel.findOne({email: req.body.email});

    if (candidate){
        res.status(409).json({
            messadge:'Такой пользователь уже зарегестрирован'
        })
    //    todo
    }else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new UserModel({
            email: req.body.email,
            password: bcrypt.hashSync(password,salt)
        });
        try {
            await user.save()
            res.status(201).json({
                user
            })
        } catch (e) {
            errorHandlert(res,e)
        }
    }

};