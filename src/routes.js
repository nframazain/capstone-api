const {
  registerUserHandler,
  loginUserHandler,
  updateUserHandler,
  deleteUserByIdHandler,
  createDonationsHandler,
  getAllDonationsHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/users",
    handler: registerUserHandler,
  },

  {
    method: "PUT",
    path: "/users/{userId}",
    handler: updateUserHandler
  },

  {
    method: "POST",
    path: "/login",
    handler: loginUserHandler,
  },

  {
    method: "DELETE",
    path: "/users/{userId}",
    handler: deleteUserByIdHandler,
  },

  {
    method: "POST",
    path: "/donations",
    handler: createDonationsHandler,
  },

  {
    method: "GET",
    path: "/donations",
    handler: getAllDonationsHandler,
  },
];

module.exports = routes;
