const fileInput = document.getElementById('fileInput');
const playlist = document.getElementById('playlist');

fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Upload file to Google Drive (Replace 'FOLDER_ID' with your actual folder ID)
  uploadFileToDrive(file, '10e9_TNVAz0rm3sSvEcuh4P1KZujGDqlG')
    .then((fileId) => {
      // Add the uploaded file to the playlist
      const fileUrl = `https://drive.google.com/uc?export=download&id=${10e9_TNVAz0rm3sSvEcuh4P1KZujGDqlG}`;
      const listItem = document.createElement('li');
      listItem.setAttribute('data-src', fileUrl);
      listItem.textContent = file.name;
      playlist.appendChild(listItem);
    })
    .catch((error) => {
      console.error('Error uploading the file:', error);
    });
}

function uploadFileToDrive(file, folderId) {
  return new Promise((resolve, reject) => {
    const accessToken = 'ya29.a0AbVbY6OYL0vSn61pinFr62wOrnpGbqo_rSmQUDH3hjA-xCbCKozt-4iJ_aPtrL6PWKPc1BG8iL3T4uhN65ag6fBntkx_HQcnyThXwP7pVwWFVcwPSFsyCy7DBsRBMGNdpz4iIZgmIfOIp_6Tvfm81Q_2U4iaaCgYKAcsSARESFQFWKvPlp6SqxfJnLnbR0_2rdaZYXg0163';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://www.googleapis.com/upload/drive/v3/files?uploadType=media&supportsAllDrives=true&parents=${10e9_TNVAz0rm3sSvEcuh4P1KZujGDqlG}`);
    xhr.setRequestHeader('Authorization', `Bearer ${ya29.a0AbVbY6OYL0vSn61pinFr62wOrnpGbqo_rSmQUDH3hjA-xCbCKozt-4iJ_aPtrL6PWKPc1BG8iL3T4uhN65ag6fBntkx_HQcnyThXwP7pVwWFVcwPSFsyCy7DBsRBMGNdpz4iIZgmIfOIp_6Tvfm81Q_2U4iaaCgYKAcsSARESFQFWKvPlp6SqxfJnLnbR0_2rdaZYXg0163}`);
    xhr.setRequestHeader('Content-Type', 'audio/mpeg');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.id);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      reject(xhr.statusText);
    };
    xhr.send(file);
  });
}
