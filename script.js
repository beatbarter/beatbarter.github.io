let driveApiLoaded = false;
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const playlist = document.getElementById('playlist');

// Load the Google Drive API client
function loadDriveApi() {
  gapi.client.load('drive', 'v3', () => {
    driveApiLoaded = true;
    console.log('Google Drive API loaded.');
  });
}

// Handle file upload when the "Upload" button is clicked
uploadButton.addEventListener('click', () => {
  if (driveApiLoaded) {
    const file = fileInput.files[0];
    if (!file) return;

    // Upload the file to Google Drive
    uploadFileToDrive(file)
      .then((response) => {
        const fileId = response.result.id;
        const fileUrl = `https://drive.google.com/uc?export=download&id=10e9_TNVAz0rm3sSvEcuh4P1KZujGDqlG`;
        
        // Add the uploaded file to the community playlist
        const listItem = document.createElement('li');
        listItem.setAttribute('data-src', fileUrl);
        listItem.textContent = file.name;
        playlist.appendChild(listItem);
        
        console.log(`File uploaded: ${file.name}`);
      })
      .catch((error) => {
        console.error('Error uploading the file:', error);
      });
  }
});

// Upload file to Google Drive
function uploadFileToDrive(file) {
  return gapi.client.drive.files.create({
    resource: {
      name: file.name,
      mimeType: 'audio/mpeg',
      parents: [ '10e9_TNVAz0rm3sSvEcuh4P1KZujGDqlG' ] // Replace with your folder ID
    },
    media: {
      mimeType: 'audio/mpeg',
      body: file
    }
  });
}

// Initialize the API client and load the Google Drive API
function initClient() {
  gapi.client.init({
    apiKey: 'ya29.a0AbVbY6NEq8dlu9vAf4a_VXDud0ScLw-6EMQPYEu3JqJ8Nrzjyr8Ur6Wuc9AZIPpjOZD2osLbzphRkd4GUu4C-_wpHMKtxJo3G65tk0gj8zc2L_Pd70Hz6zZooairiMPJDa4Y21kbUYTNLdeyiWYIc-hQ5S2caCgYKAewSARESFQFWKvPlIHthKlXGL4SEE9B5XwuJCQ0163', // Replace with your API key
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.file'
  }).then(() => {
    loadDriveApi();
  });
}

// Load the API client and authenticate the user
gapi.load('client', initClient);
