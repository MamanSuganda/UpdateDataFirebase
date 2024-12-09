// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBpSD8PtcgcbZh8OVUP9Bv3c4cYREZi1Jo",
    authDomain: "dataesp32-1d9da.firebaseapp.com",
    databaseURL: "https://dataesp32-1d9da-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dataesp32-1d9da",
    storageBucket: "dataesp32-1d9da.firebasestorage.app",
    messagingSenderId: "693577536143",
    appId: "1:693577536143:web:a50e5328274df7bdd656fa"
  };

  // Inisialisasi Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // Form submit handler
  const formInput = document.getElementById('dataForm');
  const input = document.getElementById('dataInput');
  const statusMessage = document.getElementById('statusMessage');
  const formUpdate = document.getElementById('updateForm');
  const dataKeyInput = document.getElementById('dataKey');
  const newValueInput = document.getElementById('newValue');
  const statusUpdate = document.getElementById('statusUpdate');

  formInput.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const inputData = input.value;

    if (inputData) {
      // Kirim data ke Firebase
      database.ref('database/satu').push({ value: inputData })
        .then(() => {
          statusMessage.textContent = "Data berhasil dikirim!";
          statusMessage.style.color = "green";
          formInput.reset();
        })
        .catch((error) => {
          statusMessage.textContent = "Gagal mengirim data: " + error.message;
          statusMessage.style.color = "red";
        });
    } else {
      statusMessage.textContent = "Input tidak boleh kosong!";
      statusMessage.style.color = "red";
    }
  });


  formUpdate.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const dataKey = dataKeyInput.value.trim();
    const newValue = newValueInput.value.trim();

    if (dataKey && newValue) {
      // Update data di Firebase
      const dataRef = database.ref(`massages/${dataKey}`);
      dataRef.update({ value: newValue })
        .then(() => {
          statusUpdate.textContent = "Data berhasil diupdate!";
          statusUpdate.style.color = "green";
          formUpdate.reset();
        })
        .catch((error) => {
          statusUpdate.textContent = "Gagal mengupdate data: " + error.message;
          statusUpdate.style.color = "red";
        });
    } else {
      statusUpdate.textContent = "Key dan Data Baru harus diisi!";
      statusUpdate.style.color = "red";
    }
  });
