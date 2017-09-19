
function handleClientLoad() {
  // Loads the client library and the auth2 library together for efficiency.
  // Loading the auth2 library is optional here since `gapi.client.init` function will load
  // it if not already loaded. Loading it upfront can save one network request.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // Initialize the client with API key and People API, and initialize OAuth with an
  // OAuth 2.0 client ID and scopes (space delimited string) to request access.
  gapi.client.init({
      apiKey: 'AIzaSyA04M-CDrskYoAifQ_N81wKjQXFrFb2Xw0',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
      clientId: '1098996244226-ck4nsd6oupj11qhsgsvtjob9j3jphf88.apps.googleusercontent.com',
      scope: 'profile https://www.googleapis.com/auth/youtube.force-ssl'
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn) {
  // When signin status changes, this function is called.
  // If the signin status is changed to signedIn, we make an API call.
  if (isSignedIn) {
    makeApiCall();
  }
}

function handleSignInClick(event) {
  // Ideally the button should only show up after gapi.client.init finishes, so that this
  // handler won't be called before OAuth is initialized.
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function makeApiCall() {
  // Make an API call to the People API, and print the user's given name.
  gapi.client.people.people.get({
    'resourceName': 'people/me',
    'requestMask.includeField': 'person.names'
  }).then(function(response) {
    console.log('Hello, ' + response.result.names[0].givenName);
  }, function(reason) {
    console.log('Error: ' + reason.statusText +' '+reason.body);
  });
}


