const {
  registerUserHandler,
  loginUserHandler,
  createDonations,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require(".handler/");

const routes = [
  {
    method: "POST",
    path: "/users",
    handler: registerUserHandler,
  },
  {
    method: "GET",
    path: "/users",
    handler: getUserHandler,
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: updateUserHandler,
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    handler: deleteUserHandler,
  },
  {
    method: "POST",
    path: "/login",
    handler: loginUserHandler,
  },
  {
    method: "POST",
    path: "/donations",
    handler: createDonations,
  },
];

module.exports = routes;
