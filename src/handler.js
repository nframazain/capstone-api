const { nanoid } = require("nanoid");
const users = require(/* dari db */);

const registerUserHandler = (request, h) => {
  const {
    name,
    email,
    phone,
    role,
    foodType,
    quantityFood,
    latitude,
    longitude,
    conditionFood,
    childFood,
    elderlyFood,
    allergenFood,
  } = request.payload;

  if (role !== "donor" && role !== "recipient") {
    const response = h.response({
      status: "fail",
      message: "Invalid role. Role must be filled",
    });
    response.code(400);
    return response;
  }

  if (role === "recipient") {
    if (
      !foodType ||
      !quantityFood ||
      !conditionFood ||
      !latitude ||
      !longitude
    ) {
      const response = h.response({
        status: "fail",
        message:
          "Recipient must fill name, email, phone, latitude, and longitude",
      });
      response.code(400);
      return response;
    }
  }
  const newUser = {
    userId: users.length + 1,
    name,
    email,
    phone,
    role,
    ...(role === "recipient" && {
      donationDetails: {
        foodType,
        quantityFood,
        conditionFood,
        location: {
          latitude,
          longitude,
        },
        conditionFood,
        childFood,
        elderlyFood,
        allergenFood,
      },
    }),
  };

  users.push(newUser);

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "User added successfully",
      data: { id: newUser.userId, role: newUser.role },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "User failed to register",
  });
  response.code(500);
  return response;
};

const loginUserHandler = (request, h) => {
  const { email, password } = request.payload;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    const response = h.response({
      status: "fail",
      message: "Invalid email or password",
    });
    response.code(401);
    return response;
  }

  const response = h.response({
    status: "success",
    message: "Login Successful",
    data: { id: user.userId, role: user.role },
  });
  response.code(200);
  return response;
};

const createDonationsHandler = async (request, h) => {
  const {
    foodType,
    quantityFood,
    conditionFood,
    latitude,
    longitude,
    childFood,
    elderlyFood,
    allergenFood,
  } = request.payload;

  const donationId = newDonation.length + 1;

  if (role !== "donor") {
    const response = h.response({
      status: "fail",
      message: "Invalid role. Role must be donor",
    });
    response.code(403);
    return response;
  }

  if (!foodType) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan Donasi. Mohon pilih jenis makanan",
    });
    response.code(400);
    return response;
  }

  if (!conditionFood) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan Donasi. Mohon pilih kondisi makan",
    });
    response.code(400);
    return response;
  }

  if (!quantityFood) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan Donasi. Mohon isi jumlah makanan",
    });
    response.code(400);
    return response;
  }

  if (!location) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan Donasi. Mohon isi lokasi",
    });
    response.code(400);
    return response;
  }

  const newDonation = {
    donationId,
    foodType,
    quantityFood,
    location: {
      latitude: latitude,
      longitude: longitude,
    },
    conditionFood,
    childFood,
    elderlyFood,
    allergenFood,
  };

  try {
    await addDonation(newDonation);
    const response = h.response({
      status: "success",
      message: "Donasi berhasil ditambahkan",
      data: newDonation,
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan Donasi",
    });
    response.code(500);
    return response;
  }
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  createDonationsHandler,
};
