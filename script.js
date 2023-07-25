const fileInput = document.getElementById('fileInput');
const playlist = document.getElementById('playlist');

fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Upload file to Google Drive (Replace 'FOLDER_ID' with your actual folder ID)
  uploadFileToDrive(file, 'FOLDER_ID')
    .then((fileId) => {
      // Add the uploaded file to the playlist
      const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
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
    const accessToken = 'YOUR_GOOGLE_DRIVE_ACCESS_TOKEN';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://www.googleapis.com/upload/drive/v3/files?uploadType=media&supportsAllDrives=true&parents=${folderId}`);
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
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
