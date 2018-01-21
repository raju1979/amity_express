const express = require('express');

const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');



const { validateBody, schemas } = require('../helpers/routeHelpers');
const UserController = require('../controllers/userController');

router.route('/')
  .get(UserController.root)

router.route('/signin')
    .post(validateBody(schemas.loginSchema),passport.authenticate('local',{session:false}),UserController.signIn)

router.route('/signup')
  .post(validateBody(schemas.signupSchema),UserController.signUp);

router.route('/secret')
  .get(passport.authenticate('jwt',{session:false}),UserController.secret)


module.exports = router;
