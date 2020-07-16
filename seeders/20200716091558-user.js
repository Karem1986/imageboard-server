'use strict';
//Import bcrypt for Password:
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "kartu",
          email: "karem.ortiz@outlook.com",
          password: bcrypt.hashSync("4689", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          fullName: "Spencer Ortiz",
          email: "spencer.ortiz@outlook.com",
          password: bcrypt.hashSync("4666", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
