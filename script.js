let driveApiLoaded = false;
const musicPlayer = document.getElementById('music-player');
const playButton = document.getElementById('playButton');

// Load the Google Drive API client
function loadDriveApi() {
  gapi.client.load('drive', 'v3', () => {
    driveApiLoaded = true;
    console.log('Google Drive API loaded.');
  });
}

// Handle "Play Playlist" button click
playButton.addEventListener('click', () => {
  if (driveApiLoaded) {
    playGoogleDrivePlaylist();
  }
});

// Play Google Drive playlist
function playGoogleDrivePlaylist() {
  gapi.client.drive.files.list({
    q: "'10e9_TNVAz0rm3sSvEcuh4P1KZujGDqlG' in parents", // Replace with your folder ID
    fields: 'files(name, webContentLink)',
  }).then((response) => {
    const files = response.result.files;
    if (files && files.length > 0) {
      const playlistUrls = files.map((file) => file.webContentLink);
      playFilesInOrder(playlistUrls);
    } else {
      console.log('No files found in the Google Drive folder.');
    }
  }).catch((error) => {
    console.error('Error listing files:', error);
  });
}

// Play files in order from an array of URLs
function playFilesInOrder(urls) {
  let currentFileIndex = 0;

  function playNextFile() {
    if (currentFileIndex >= urls.length) {
      console.log('End of playlist.');
      return;
    }

    const currentUrl = urls[currentFileIndex];
    musicPlayer.src = currentUrl;
    musicPlayer.play();

    musicPlayer.onended = function() {
      currentFileIndex++;
      playNextFile();
    };
  }

  playNextFile();
}

// Initialize the API client and load the Google Drive API
function initClient() {
  gapi.client.init({
    apiKey: 'YOUR_GOOGLE_DRIVE_API_KEY', // Replace with your Google Drive API key
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.file'
  }).then(() => {
    loadDriveApi();
  });
}


// Load the API client and authenticate the user
gapi.load('client', initClient);
