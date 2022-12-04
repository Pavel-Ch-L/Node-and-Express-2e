const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const db = require('../db')

// Храним идентификатор пользователя в сессии
// При необходимости можем получить объект User из БД
// После реализации этих 2 методов, пока сессия активна и пользователь 
// успешнопрошел аутентификацию req.session.passport.user будет соответствовать
// объекту user из БД
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => {
  db.getUserById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null))
})

module.exports = (app, options) => {

  // Если не определен редирект в случае удачи и неудачи
  // устанавливаются по умолчанию
	if(!options.successRedirect)
		options.successRedirect = '/account'
	if(!options.failureRedirect)
		options.failureRedirect = '/login'

	return {
    init: function() {
      const config = options.providers

      // Конфигурация стратегии Facebook
      passport.use(new FacebookStrategy({ // Эта функция вызывается после успешного прохождения аутентификации
        clientID: config.facebook.appId,
        clientSecret: config.facebook.appSecret,
        callbackURL: (options.baseUrl || '') + '/auth/facebook/callback',
      }, (accessToken, refreshToken, profile, done) => { // profile содержит информацию о пользователе Facebook
        const authId = 'facebook:' + profile.id // Избегаем совпадения имен идентификаторов в БД
        db.getUserByAuthId(authId)
          .then(user => {
            // Если идентификатор уже содержится в БД - возвращаем эту запись (когда вызывается serializeUser, 
            // который помещает идентификатор пользователя в сессию)
            if(user) return done(null, user)
            // Если запись пользователя не вернулась, создаем новый объект пользователя и помещаем его в БД
            db.addUser({
              authId: authId,
              name: profile.displayName,
              created: new Date(),
              role: 'customer',
            })
              .then(user => done(null, user))
              .catch(err => done(err, null))
          })
          .catch(err => {
            console.log('whoops, there was an error: ', err.message)
            if(err) return done(err, null);
          })
      }))

      // Конфигурация стратегии strategy
      passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: (options.baseUrl || '') + '/auth/google/callback',
      }, (token, tokenSecret, profile, done) => {
        const authId = 'google:' + profile.id
        db.getUserByAuthId(authId)
          .then(user => {
            if(user) return done(null, user)
            db.addUser({
              authId: authId,
              name: profile.displayName,
              created: new Date(),
              role: 'customer',
            })
              .then(user => done(null, user))
              .catch(err => done(err, null))
          })
          .catch(err => {
            console.log('whoops, there was an error: ', err.message)
            if(err) return done(err, null);
          })
      }))

      app.use(passport.initialize())
      app.use(passport.session())
    },
    registerRoutes: () => {
      // Регистрация Facebook маршрутов

      // При переходе по адресу /auth/facebook пользователь перенаправится на стр аутентификации
      app.get('/auth/facebook', (req, res, next) => {
        // redirect направит пользователя к месту назначения после аутентификации
        if(req.query.redirect) req.session.authRedirect = req.query.redirect
        passport.authenticate('facebook')(req, res, next)
      })
      // После авторизации браузер перенапрвится /auth/facebook/callback 
      // с опциональной строкой redirect + токены аутентификации
      // если проверка прошла неуспешно Passport пренапрвит браузер на options.failureRedirect
      app.get('/auth/facebook/callback', passport.authenticate('facebook',
        { failureRedirect: options.failureRedirect }),
        (req, res) => {
          console.log('successful /auth/facebook/callback')
          // Сюда попадаем в случае успешной аутентификации
          const redirect = req.session.authRedirect
          if(redirect) delete req.session.authRedirect
          console.log(`redirecting to ${redirect || options.successRedirect}${redirect ? '' : ' (fallback)'}`)
          res.redirect(303, redirect || options.successRedirect)
        }
      )
      // Регистрация Google маршрутов
      app.get('/auth/google', (req, res, next) => {
        if(req.query.redirect) req.session.authRedirect = req.query.redirect
        passport.authenticate('google', { scope: ['profile'] })(req, res, next)
      })
      app.get('/auth/google/callback', passport.authenticate('google',
        { failureRedirect: options.failureRedirect }),
        (req, res) => {
          // Сюда попадаем в случае успешной аутентификации
          const redirect = req.session.authRedirect
          if(redirect) delete req.session.authRedirect
          res.redirect(303, req.query.redirect || options.successRedirect)
        }
      )
    },
	}
}
