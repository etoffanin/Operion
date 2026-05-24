let cameraStream = null;

async function startCamera(videoElement) {
  if (!videoElement) return null;

  cameraStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
    },
    audio: false,
  });

  videoElement.srcObject = cameraStream;

  return cameraStream;
}

function getCameraStream() {
  return cameraStream;
}

function stopCamera() {
  if (!cameraStream) return;

  cameraStream.getTracks().forEach((track) => {
    track.stop();
  });

  cameraStream = null;
}