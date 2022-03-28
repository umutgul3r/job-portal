const Users = require('../models/UserModel')

const loginService = (data) => {
  console.log(data)
  return Users.findOne({ email: data.email })
}

module.exports = {
  loginService,
}
