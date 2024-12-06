const { nanoid } = require("nanoid");
const users = require(/* dari db */);

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

  const newUser = {
    userId: users.length + 1,
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

const checkRoleRecipient = (request, h) => {
  const { role } = request.payload;

  users.pull(newUser);

  if (role !== "recipient") {
    const response = h.response({
      status: "fail",
      message: "Invalid role. Role must be recipient",
    });
    response.code(400);
    return response;
  }
};

const checkRoleDonor = (request, h) => {
  const { role } = request.payload;

  users.pull(newUser);

  if (role !== "donor") {
    const response = h.response({
      status: "fail",
      message: "Invalid role. Role must be donor",
    });
    response.code(400);
    return response;
  }
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

const createDonationsHandler = (request, h) => {
  const {
    foodType,
    quantityFood,
    location,
    conditionFood,
    childFood,
    elderlyFood,
    allergenFood,
  } = request.payload;

  const donationId = newDonation.length + 1;

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

  const getDonations = (request, h) => {};
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  createDonationsHandler,
};

const addLocation = (request, h) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Lakukan sesuatu dengan latitude dan longitude, misalnya menampilkannya pada sebuah elemen
    document.getElementById("location").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
  }

  function error() {
      alert("Unable to retrieve your location");
  }

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

  function initMap() {
    var myLatLng = {lat: -5.395512338172377, lng: 105.2894940149432}; // Ganti dengan koordinat awal
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });
  }
};
