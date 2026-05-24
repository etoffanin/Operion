function updateCameraStatus(statusElement, text, statusClass) {
  if (!statusElement) return;

  statusElement.textContent = text;
  statusElement.classList.remove("active", "recording", "paused");

  if (statusClass) {
    statusElement.classList.add(statusClass);
  }
}

function enableButtons(buttons) {
  buttons.forEach((button) => {
    if (button) {
      button.disabled = false;
    }
  });
}

function disableButtons(buttons) {
  buttons.forEach((button) => {
    if (button) {
      button.disabled = true;
    }
  });
}

function showDownloadLink(linkElement, videoUrl) {
  if (!linkElement || !videoUrl) return;

  linkElement.href = videoUrl;
  linkElement.classList.remove("hidden");
}

function renderPhoto(photoGallery, imageURL) {
  if (!photoGallery || !imageURL) return;

  const emptyMessage = document.querySelector(".empty-message");

  if (emptyMessage) {
    emptyMessage.remove();
  }

  const image = document.createElement("img");
  image.src = imageURL;

  photoGallery.appendChild(image);
}