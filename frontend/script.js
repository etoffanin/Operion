const cameraPreview = document.getElementById("cameraPreview");
const photoCanvas = document.getElementById("photoCanvas");

const openCameraBtn = document.getElementById("openCameraBtn");
const startRecordBtn = document.getElementById("startRecordBtn");
const stopRecordBtn = document.getElementById("stopRecordBtn");

const emptyContainerPhotoBtn = document.getElementById("emptyContainerPhotoBtn");
const containerIdPhotoBtn = document.getElementById("containerIdPhotoBtn");
const middlePhotoBtn = document.getElementById("middlePhotoBtn");
const finalPhotoBtn = document.getElementById("finalPhotoBtn");

const photoGallery = document.getElementById("photoGallery");

const coilCurrent = document.getElementById("coilCurrent");
const coilTotalDisplay = document.getElementById("coilTotalDisplay");

const addCoilBtn = document.getElementById("addCoilBtn");

const generatePackageBtn = document.getElementById("generatePackageBtn");

const operationSummary = document.getElementById("operationSummary");

const downloadVideoLink = document.getElementById("downloadVideoLink");

const cameraStatus = document.getElementById("cameraStatus");

const coilMessage = document.getElementById("coilMessage");

const coilTotalInput = document.getElementById("coilTotal");

let stream = null;

let mediaRecorder = null;

let recordedChunks = [];

let currentCoil = 0;

let totalCoils = 0;

let capturedPhotos = [];



/* =========================
   ABRIR CÂMERA
========================= */

openCameraBtn.addEventListener("click", openCamera);

async function openCamera() {

  try {

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment"
      },
      audio: false
    });

    cameraPreview.srcObject = stream;

    cameraStatus.textContent = "Câmera ativa";
    cameraStatus.classList.add("active");

    startRecordBtn.disabled = false;

    emptyContainerPhotoBtn.disabled = false;
    containerIdPhotoBtn.disabled = false;
    middlePhotoBtn.disabled = false;
    finalPhotoBtn.disabled = false;

    addCoilBtn.disabled = false;

  } catch (error) {

    console.error(error);

    alert("Erro ao acessar câmera.");

  }

}



/* =========================
   GRAVAÇÃO
========================= */

startRecordBtn.addEventListener("click", startRecording);

function startRecording() {

  recordedChunks = [];

  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {

    if (event.data.size > 0) {

      recordedChunks.push(event.data);

    }

  };

  mediaRecorder.onstop = generateVideo;

  mediaRecorder.start();

  startRecordBtn.disabled = true;
  stopRecordBtn.disabled = false;

  cameraStatus.textContent = "Gravando";
  cameraStatus.classList.remove("active");
  cameraStatus.classList.add("recording");

}



stopRecordBtn.addEventListener("click", stopRecording);

function stopRecording() {

  mediaRecorder.stop();

  startRecordBtn.disabled = false;
  stopRecordBtn.disabled = true;

  cameraStatus.textContent = "Gravação finalizada";

  cameraStatus.classList.remove("recording");

}



/* =========================
   GERAR VÍDEO
========================= */

function generateVideo() {

  const blob = new Blob(recordedChunks, {
    type: "video/webm"
  });

  const videoURL = URL.createObjectURL(blob);

  downloadVideoLink.href = videoURL;

  downloadVideoLink.classList.remove("hidden");

}



/* =========================
   TIRAR FOTO
========================= */

emptyContainerPhotoBtn.addEventListener("click", () => {
  capturePhoto("Container vazio");
});

containerIdPhotoBtn.addEventListener("click", () => {
  capturePhoto("Identificação");
});

middlePhotoBtn.addEventListener("click", () => {
  capturePhoto("Foto intermediária");
});

finalPhotoBtn.addEventListener("click", () => {
  capturePhoto("Container final");
});



function capturePhoto(photoType) {

  const context = photoCanvas.getContext("2d");

  photoCanvas.width = cameraPreview.videoWidth;
  photoCanvas.height = cameraPreview.videoHeight;

  context.drawImage(
    cameraPreview,
    0,
    0,
    photoCanvas.width,
    photoCanvas.height
  );

  const imageURL = photoCanvas.toDataURL("image/png");

  capturedPhotos.push({
    type: photoType,
    image: imageURL
  });

  renderPhoto(imageURL);

}



/* =========================
   MOSTRAR FOTO
========================= */

function renderPhoto(imageURL) {

  const emptyMessage = document.querySelector(".empty-message");

  if (emptyMessage) {

    emptyMessage.remove();

  }

  const image = document.createElement("img");

  image.src = imageURL;

  photoGallery.appendChild(image);

}



/* =========================
   CONTADOR DE BOBINAS
========================= */

coilTotalInput.addEventListener("change", () => {

  totalCoils = Number(coilTotalInput.value);

  coilTotalDisplay.textContent = totalCoils;

});



addCoilBtn.addEventListener("click", addCoil);

function addCoil() {

  if (totalCoils === 0) {

    alert("Informe a quantidade total de bobinas.");

    return;

  }

  if (currentCoil >= totalCoils) {

    return;

  }

  currentCoil++;

  coilCurrent.textContent = currentCoil;

  coilMessage.textContent =
    `Bobina ${currentCoil} registrada com sucesso.`;



  /* FOTO AUTOMÁTICA NA METADE */

  const middlePoint = Math.ceil(totalCoils / 2);

  if (currentCoil === middlePoint) {

    capturePhoto("Foto automática intermediária");

  }



  /* TODAS FINALIZADAS */

  if (currentCoil === totalCoils) {

    coilMessage.textContent =
      "Todas as bobinas foram carregadas.";

  }

}



/* =========================
   GERAR RESUMO
========================= */

generatePackageBtn.addEventListener("click", generateSummary);

function generateSummary() {

  const booking =
    document.getElementById("booking").value;

  const container =
    document.getElementById("containerCode").value;

  const material =
    document.getElementById("material").value;

  const carrier =
    document.getElementById("carrier").value;

  const driver =
    document.getElementById("driver").value;

  const date =
    document.getElementById("date").value;

  const summary = `
DATA: ${date}

BOOKING: ${booking}

CONTAINER: ${container}

MATERIAL: ${material}

TRANSPORTADORA: ${carrier}

MOTORISTA: ${driver}

BOBINAS:
${currentCoil}/${totalCoils}

FOTOS:
${capturedPhotos.length}

STATUS:
OPERAÇÃO FINALIZADA
`;

  operationSummary.textContent = summary;

}