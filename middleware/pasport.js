const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require(`mongoose`);
const key = require('../config/keys');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:key.jwt
};
module.exports = pasport => {
    pasport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await mongoose.findById(payload.userId);
                if(user){
                    done(null , user)
                }else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }

        })
    )
}