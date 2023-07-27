// jsfilename.js
document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize Google Drive API with your OAuth2 client ID
    function initClient() {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: '637925006165-ikssgig311emd4t83dbn03867591ka8v.apps.googleusercontent.com', // Replace with your own client ID
                scope: 'https://www.googleapis.com/auth/drive.file',
            }).then(function () {
                console.log('Google Drive API initialized.');
            }).catch(function (error) {
                console.error('Error initializing Google Drive API:', error);
            });
        });
    }

    // Function to handle the file upload form submission
    function handleFormSubmit(event) {
        event.preventDefault();
        const fileInput = document.getElementById('fileInput');
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            uploadFile(file);
        }
    }

  // Function to upload the file to Google Drive
function uploadFile(file) {
    const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: ['10e9_TNVAz0rm3sSvEcuh4P1KZujGDqlG'], // Replace with the folder ID where you want to store the files
    };

    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Data = e.target.result.split(',')[1]; // Get the base64 data after the comma
        const blob = new Blob([base64Data], { type: file.type });

        // Use the new gapi.client.request method to upload the file
        gapi.client.request({
            path: '/drive/v3/files',
            method: 'POST',
            params: {
                uploadType: 'multipart',
            },
            headers: {
                'Content-Type': 'multipart/related;',
            },
            body: {
                metadata: JSON.stringify(metadata),
                file: blob,
            },
        }).then(function (response) {
            console.log('File uploaded successfully:', response.result.id);
            displayUploadedFile(file.name, response.result.id);
        }).catch(function (error) {
            console.error('Error uploading file:', error);
        });
    };
    reader.readAsDataURL(file);
}

    // Function to display the uploaded files in the shared playlist with audio playback
    function displayUploadedFile(filename, fileId) {
        const playlist = document.getElementById('playlist');
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
        a.innerText = filename;

        // Create an audio element and set its source to the Google Drive link
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = `https://drive.google.com/uc?export=download&id=${fileId}`;

        li.appendChild(a);
        li.appendChild(audio);
        playlist.appendChild(li);
    }

    document.getElementById('uploadForm').addEventListener('submit', (event) => handleFormSubmit(event));

    // Load the Google Drive API client library
    gapi.load('client:auth2', initClient);
});
