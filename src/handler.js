const {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
} = require("firebase/firestore");
const { db } = require("./services");

const newRecipientsIdHandler = async () => {
  const counterId = doc(db, "counters", "recipients");
  const counterSnap = await getDoc(counterId);

  let nextId = 1;

  if (counterSnap.exists()) {
    nextId = counterSnap.data().lastId + 1;
  }

  await setDoc(counterId, { lastId: nextId });
  return `T${nextId}`;
};

const newDonorsIdHandler = async () => {
  const counterId = doc(db, "counters", "donors");
  const counterSnap = await getDoc(counterId);

  let nextId = 1;

  if (counterSnap.exists()) {
    nextId = counterSnap.data().lastId + 1;
  }

  await setDoc(counterId, { lastId: nextId });
  return `D${nextId}`;
};

const registerRecipientHandler = async (request, h) => {
  const {
    nama_penerima,
    lokasi_lat_penerima,
    lokasi_lon_penerima,
    makanan_dibutuhkan,
    jumlah_dibutuhkan,
    kondisi_makanan_diterima,
    is_halal_receiver,
    is_for_child_receiver,
    is_for_elderly_receiver,
    is_alergan_free,
    status_penerima,
    frekuensi_penerima,
    alamat_penerima,
    kontak_penerima,
    email_penerima,
    tentang_penerima,
    foto_profil_penerima,
    username_penerima,
    password_penerima,
  } = request.payload;

  const id_penerima = await newRecipientsIdHandler();

  if (
    !nama_penerima ||
    !lokasi_lat_penerima ||
    !lokasi_lon_penerima ||
    !makanan_dibutuhkan ||
    !jumlah_dibutuhkan ||
    !kondisi_makanan_diterima ||
    !alamat_penerima ||
    !kontak_penerima ||
    !email_penerima ||
    !username_penerima ||
    !password_penerima ||
    !is_halal_receiver ||
    !is_for_child_receiver ||
    !is_for_elderly_receiver ||
    !is_alergan_free ||
    !status_penerima ||
    !frekuensi_penerima
  ) {
    const response = h.response({
      status: "fail",
      message: "Recipient must filled the form",
    });
    response.code(400);
    return response;
  }

  const newRecipient = {
    id_penerima,
    nama_penerima,
    lokasi_lat_penerima,
    lokasi_lon_penerima,
    makanan_dibutuhkan,
    jumlah_dibutuhkan,
    kondisi_makanan_diterima,
    is_halal_receiver,
    is_for_child_receiver,
    is_for_elderly_receiver,
    is_alergan_free,
    status_penerima,
    frekuensi_penerima,
    alamat_penerima,
    kontak_penerima,
    email_penerima,
    tentang_penerima,
    foto_profil_penerima,
    username_penerima,
    password_penerima,
    role: "recipient",
  };

  try {
    const collectionName = "recipients";
    const recipient = await addDoc(
      collection(db, collectionName),
      newRecipient
    );
    const response = h.response({
      status: "success",
      message: "User created successfully",
      data: { id: recipient.id, role: newRecipient.role },
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

const registerDonorHandler = async (request, h) => {
  const {
    nama_penyumbang,
    lokasi_lat_penyumbang,
    lokasi_lon_penyumbang,
    alamat_penyumbang,
    kontak_penyumbang,
    email_penyumbang,
    tentang_penyumbang,
    foto_profil_penyumbang,
    username_penyumbang,
    password_penyumbang,
  } = request.payload;

  const id_penyumbang = await newDonorsIdHandler();

  if (
    !nama_penyumbang ||
    !lokasi_lat_penyumbang ||
    !lokasi_lon_penyumbang ||
    !alamat_penyumbang ||
    !kontak_penyumbang ||
    !email_penyumbang ||
    !username_penyumbang ||
    !password_penyumbang
  ) {
    const response = h.response({
      status: "fail",
      message: "Please fill in all fields",
    });
    response.code(400);
    return response;
  }

  const newDonor = {
    id_penyumbang,
    nama_penyumbang,
    lokasi_lat_penyumbang,
    lokasi_lon_penyumbang,
    alamat_penyumbang,
    kontak_penyumbang,
    email_penyumbang,
    tentang_penyumbang,
    foto_profil_penyumbang,
    username_penyumbang,
    password_penyumbang,
    role: "donor",
  };

  try {
    const collectionName = "donors";
    const donor = await addDoc(collection(db, collectionName), newDonor);
    const response = h.response({
      status: "success",
      message: "Donor registered successfully",
      data: { id: donor.id, role: newDonor.role },
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Failed to register donor",
    });
    response.code(500);
    return response;
  }
};

const getAllRecipientsHandler = async (request, h) => {
  try {
    const getRecipients = await getDocs(collection(db, "recipients"));
    const recipients = getRecipients.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const response = h.response({
      status: "success",
      data: { recipients },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Failed to get all recipients",
    });
    response.code(500);
    return response;
  }
};

const getAllDonorsHandler = async (request, h) => {
  try {
    const getDonors = await getDocs(collection(db, "donors"));
    const donors = getDonors.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const response = h.response({
      status: "success",
      data: { donors },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Failed to get all donors",
    });
    response.code(500);
    return response;
  }
};

const getRecipientByIdHandler = async (request, h) => {
  const { RecipientId } = request.params;

  try {
    const recipientDoc = await getDocs(doc(db, "recipients", RecipientId));
    if (!recipientDoc.exists()) {
      const response = h.response({
        status: "error",
        message: "Recipient not found",
      });
      response.code(404);
      return response;
    }

    const response = h.response({
      status: "success",
      data: { recipient: recipientDoc.data() },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Failed to get recipient by id",
    });
    response.code(500);
    return response;
  }
};

const getDonorByIdHandler = async (request, h) => {
  const { DonorId } = request.params;

  try {
    const donorDoc = await getDocs(doc(db, "donors", DonorId));
    if (!donorDoc.exists()) {
      const response = h.response({
        status: "error",
        message: "Donor not found",
      });
      response.code(404);
      return response;
    }

    const response = h.response({
      status: "success",
      data: { id: donorDoc.id, ...donorDoc.data() },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Failed to get donor by id",
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
  registerRecipientHandler,
  registerDonorHandler,
  loginUserHandler,
  getAllRecipientsHandler,
  getAllDonorsHandler,
  getRecipientByIdHandler,
  getDonorByIdHandler,
  createDonationsHandler,
};
