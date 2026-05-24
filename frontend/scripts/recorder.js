let mediaRecorder = null;
let recordedChunks = [];
let recordedVideoUrl = null;

function startRecording(stream, onStopCallback) {
  if (!stream) {
    alert("Abra a câmera antes de iniciar a gravação.");
    return;
  }

  recordedChunks = [];

  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });

    recordedVideoUrl = URL.createObjectURL(blob);

    if (typeof onStopCallback === "function") {
      onStopCallback(recordedVideoUrl);
    }
  };

  mediaRecorder.start();
}

function stopRecording() {
  if (!mediaRecorder || mediaRecorder.state === "inactive") return;

  mediaRecorder.stop();
}

function getRecordedVideoUrl() {
  return recordedVideoUrl;
}