const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {
  ExtractJwt
} = require('passport-jwt');

const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user_model');

// const SECRET = process.env.JWT_SECRET;
const SECRET = 'secret';

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET
}, async (payload, done) => {
  try {
    //find the user specified in TOKEN
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (eror) {
    done(error, false)
  }

}))

passport.use(new LocalStrategy({
  usernameField:'email'
},async (email,password,done) => {
  try{
    //find the user given the email
    const user = await User.findOne({email})
    //if not handle it
    if(!user){
      return done(null,false)
    }
    //check if password is correct
    console.log(user);
    const isMatched = await user.isValidPassword(password)
    //if pass not isMatched
    if(!isMatched){
      return done(null,false)
    }
    //otherwise return the user
    done(null,user)
  }catch(error){
    return done(error,false);
  }

}))
