const { nanoid } = require("nanoid");
const users = requre(/* dari db */);

const registerUserHandler = (request, h) => {
  const { name, email, phone, role } = request.payload;

  if (role !== "donor" && role !== "recipient") {
    const response = h.response({
      status: "fail",
      message: "Invalid role. Role must be filled",
    });
    response.code(400);
    return response;
  }

  const userId = nanoid(16);

  const newUser = {
    userId,
    name,
    email,
    phone,
    role,
  };

  users.push(newUser);

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "User added successfully",
      data: newUser,
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
};

const createDonations = (request, h) => {
  const {
    foodType,
    quantityFood,
    location,
    conditionFood,
    childFood,
    elderlyFood,
    allergenFood,
  } = request.payload;

  const donationId = nanoid(10);

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
    location,
    conditionFood,
    childFood,
    elderlyFood,
    allergenFood,
  };

  const response = h.response({
    status: "success",
    message: "Donasi Berhasil Ditambahkan",
    data: newDonation,
  });
  response.code(201);
  return response;
};

const addLocation = (request, h) => {
  const {
    latitude,
    longitude,
  } = request.payload;

  const locationId = nanoid(20);

  if (!latitude) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan lokasi. Mohon menentukan posisi dengan benar",
    });
    response.code(400);
    return response;
  }

  if (!longitude) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan lokasi. Mohon menentukan posisi dengan benar",
    });
    response.code(400);
    return response;
  }

  const newLocation = {
    locationId,
    latitude,
    longitude,
  };

  const response = h.response({
    status: "success",
    message: "Lokasi Berhasil Ditambahkan",
    data: newLocation,
  });
  response.code(201);
  return response;
};
