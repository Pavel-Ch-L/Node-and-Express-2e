// Хранение пользователей в БД

// Создадим модель models/user.js
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  authId :  String,
  name :    String,
  email :   String,
  role :    String,
  created : Date
})
const User = mongoose.model('User', userSchema)
module.exports = User


// db.js
const User = require('./models/user')
module.exports = {
  // ...
  getUserById :     async id => User.findById(id),
  getUserByAuthId : async authId => User.findOne({ authId }),
  addUser:          async data => new User(data).save()
}