const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAXglKXqok4YUskv6_YDoMQE-qMaq0jqzk",
  authDomain: "centering-abode-438216-q7.firebaseapp.com",
  databaseURL:
    "https://centering-abode-438216-q7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "centering-abode-438216-q7",
  storageBucket: "centering-abode-438216-q7.firebasestorage.app",
  messagingSenderId: "139087326761",
  appId: "1:139087326761:web:a85733dadd51899240f638",
  measurementId: "G-591MJYHZ4Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//untuk Firestore
const db = getFirestore(app);

module.exports = db;
