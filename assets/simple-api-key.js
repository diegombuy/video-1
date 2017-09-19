// var id_ingles, sub_track;

function start() {
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': 'AIzaSyA04M-CDrskYoAifQ_N81wKjQXFrFb2Xw0',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
  }).then(function() {
    // hago el pedido
    var videoid = document.getElementById("videoid").value;
    return gapi.client.youtube.captions.list({
      'part': 'snippet',
      'videoId': videoid
//      'videoId': 'fkkDvKGcNSo'	// el código linux (1 sub)
//      'videoId': 'M7FIvfx5J10'	// jean claude y los camiones (29 subs)
//      'videoId': '1gTeH9RiQKk'	// stallman (0 subs)
    });
  }).then(function(response) {
    var subs = response.result.items,
      texto = '';

    for (i = 0; i < subs.length; i++) {
      if (subs[i].snippet.language === 'en') window.id_ingles = subs[i].id;
      texto += subs[i].snippet.language + ', ';
    }
    if (subs.length > 0) texto = texto.slice(0, texto.length - 2);
  
    document.getElementById('results').innerHTML = 'Cantidad de subtítulos: ' + subs.length + '<br><br>' + texto;
  }, function(reason) {
    console.log('Error: ' + reason.statusText +' '+reason.body);
  });
};

function listarSubs() {
  // Loads the JavaScript client library and invokes `start` afterwards.
  res = gapi.load('client', start);
};


