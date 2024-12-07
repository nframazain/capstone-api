const { nanoid } = require("nanoid");
import { db } from "./services";
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
const { bcrypt } = require("bcrypt");

const registerUserHandler = async (request, h) => {
  const {
    name,
    email,
    password,
    phone,
    role,
    foodType, // only for recipients
    quantityFood, // only for recipients
    latitude, // only for recipients
    longitude, // only for recipients
    conditionFood, // only for recipients
    childFood, // only for recipients
    elderlyFood, // only for recipients
    allergenFood, // only for recipients
  } = request.payload;

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
    password,
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

  try {
    const collectionName = role === "donor" ? "donors" : "recipients";
    const docRef = await addDoc(collection(db, collectionName), newUser);
    const response = h.response({
      status: "success",
      message: "User created successfully",
      data: { id: docRef.id, role: newUser.role },
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "User failed to register",
    });
    response.code(500);
    return response;
  }
};
// end register user handler

const getUserHandler = async (request, h) => {
  const { id } = request.params;

  try {
    const getUser = await getDoc(doc(db, "users", id));

    if (!getUser.exists()) {
      const response = h.response({
        status: "fail",
        message: "User not found",
      });
      response.code(404);
      return response;
    }
    const user = userDoc.data();
    const response = h.response({
      status: "success",
      message: "User found",
      data: user,
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "Failed to get user",
    });
    response.code(500);
    return response;
  }
};

const updateUserHandler = async (request, h) => {
  const { id } = request.params;
  const { name, password, email, phone, role } = request.payload;

  try {
    const changeUser = doc(db, "users", id);
    await updateDoc(changeUser, {
      name,
      password,
      email,
      phone,
      role,
    });

    const response = h.response({
      status: "success",
      message: "User updated",
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "Failed to update user",
    });
    response.code(500);
    return response;
  }
};

const deleteUserHandler = async (request, h) => {
  const { id } = request.params;

  try {
    await deleteDoc(doc(db, "users", id));

    const response = h.response({
      status: "success",
      message: "User deleted",
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "Failed to delete user",
    });
    response.code(500);
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
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  createDonationsHandler,
};
