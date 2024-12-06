const {
  registerUserHandler,
  loginUserHandler,
  createDonations,
} = require(".handler/");

const routes = [
  {
    method: "POST",
    path: "/users",
    handler: registerUserHandler,
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
