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
const coilTotalInput = document.getElementById("coilTotal");
const coilMessage = document.getElementById("coilMessage");

const addCoilBtn = document.getElementById("addCoilBtn");
const generatePackageBtn = document.getElementById("generatePackageBtn");

const operationSummary = document.getElementById("operationSummary");
const downloadVideoLink = document.getElementById("downloadVideoLink");
const cameraStatus = document.getElementById("cameraStatus");

let currentCoil = 0;
let totalCoils = 0;
let capturedPhotos = [];

openCameraBtn.addEventListener("click", handleOpenCamera);
startRecordBtn.addEventListener("click", handleStartRecording);
stopRecordBtn.addEventListener("click", handleStopRecording);

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

coilTotalInput.addEventListener("change", updateTotalCoils);
addCoilBtn.addEventListener("click", addCoil);
generatePackageBtn.addEventListener("click", generateSummary);

async function handleOpenCamera() {
  try {
    await startCamera(cameraPreview);

    setOperationState(OPERATION_STATE.CAMERA_ACTIVE);

    updateCameraStatus(cameraStatus, "Câmera ativa", "active");

    enableButtons([
      startRecordBtn,
      emptyContainerPhotoBtn,
      containerIdPhotoBtn,
      middlePhotoBtn,
      finalPhotoBtn,
      addCoilBtn,
    ]);
  } catch (error) {
    console.error(error);
    alert("Erro ao acessar câmera.");
  }
}

function handleStartRecording() {
  const stream = getCameraStream();

  startRecording(stream, (videoUrl) => {
    showDownloadLink(downloadVideoLink, videoUrl);
  });

  setOperationState(OPERATION_STATE.RECORDING);

  startRecordBtn.disabled = true;
  stopRecordBtn.disabled = false;

  updateCameraStatus(cameraStatus, "Gravando", "recording");
}

function handleStopRecording() {
  stopRecording();

  setOperationState(OPERATION_STATE.FINISHED);

  startRecordBtn.disabled = false;
  stopRecordBtn.disabled = true;
  generatePackageBtn.disabled = false;

  updateCameraStatus(cameraStatus, "Gravação finalizada", "");
}

function capturePhoto(photoType) {
  if (!cameraPreview || !photoCanvas) return;

  if (!cameraPreview.videoWidth || !cameraPreview.videoHeight) {
    alert("Abra a câmera antes de tirar foto.");
    return;
  }

  const context = photoCanvas.getContext("2d");

  photoCanvas.width = cameraPreview.videoWidth;
  photoCanvas.height = cameraPreview.videoHeight;

  context.drawImage(cameraPreview, 0, 0, photoCanvas.width, photoCanvas.height);

  const imageURL = photoCanvas.toDataURL("image/png");

  capturedPhotos.push({
    type: photoType,
    image: imageURL,
  });

  renderPhoto(photoGallery, imageURL);
}

function updateTotalCoils() {
  totalCoils = Number(coilTotalInput.value);
  coilTotalDisplay.textContent = totalCoils;
}

function addCoil() {
  if (totalCoils === 0) {
    alert("Informe a quantidade total de bobinas.");
    return;
  }

  if (currentCoil >= totalCoils) return;

  currentCoil++;
  coilCurrent.textContent = currentCoil;

  coilMessage.textContent = `Bobina ${currentCoil} registrada com sucesso.`;

  const middlePoint = Math.ceil(totalCoils / 2);

  if (currentCoil === middlePoint) {
    capturePhoto("Foto automática intermediária");
  }

  if (currentCoil === totalCoils) {
    coilMessage.textContent = "Todas as bobinas foram carregadas.";
  }
}

function generateSummary() {
  const booking = document.getElementById("booking").value;
  const container = document.getElementById("containerCode").value;
  const material = document.getElementById("material").value;
  const date = document.getElementById("date").value;

  const summary = `
DATA: ${date}

BOOKING: ${booking}

CONTAINER: ${container}

MATERIAL: ${material}

BOBINAS:
${currentCoil}/${totalCoils}

FOTOS:
${capturedPhotos.length}

STATUS:
OPERAÇÃO FINALIZADA
`;

  operationSummary.textContent = summary;
}