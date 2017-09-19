
(function ($) {
	$(document).ready(function () {

		videojs('yt1').ready(function () {
			var player = this,
					id = document.getElementById("videoid").value,
					url = 'https://www.youtube.com/watch?v=' + id;
			
			player.src({type: 'video/youtube', src: url});
	
			$("#btn-cargar-yt1").on('click', function () {
		    id = document.getElementById("videoid").value;
		    url = 'https://www.youtube.com/watch?v=' + id;

		    player.src({type: 'video/youtube', src: url});
				//$("#yt1").removeClass("vjs-controls-enabled");
		    player.poster('https://img.youtube.com/vi/'+id+'/maxresdefault.jpg');
		    return false;
		  });
		    
		  // capturo los clicks sobre el div que contiene el video
		  $("#video").on('click', function () {
		    console.log(" * Atrapé un click!!!");
		    playPause();
		    videojs('yt1').blur();
		    videojs('yt1').setAttribute('style', 'z-index:-1');
//		    console.log(ytplayer.config.args.storyboard_spec);
		  });
		  
			// muestro los subtítulos en Español
		  $("button#btn-subs-yt1").on('click', function () {

				var sub = new XMLHttpRequest(), lang = 'es';
				sub.addEventListener("load", function () {
					if (this.readyState == 4 && this.status == 200) {
						var res = sub.responseText,
								texto = '<ul id="sortable">';
				
						parser = new DOMParser();
						xmlDoc = parser.parseFromString(res,"text/xml");
//						console.log(res);
						var tr = xmlDoc.getElementsByTagName("transcript")[0].childNodes;
						
						for (i = 0; i < tr.length; i++) {
							texto += '<li class="ui-state-default collection-item">'+tr[i].textContent +': '+ tr[i].attributes[0].value+' ('+ tr[i].attributes[1].value +')</li><br>';
							var x = $('<li class="ui-state-default collection-item">'+tr[i].textContent +': '+ tr[i].attributes[0].value+' ('+ tr[i].attributes[1].value +')</li><br>');
							x.appendTo('#sortable');
						}
						
						texto += '</ul>';
						$( "#sortable" ).sortable({ refresh: sortable });
		  		}
				});
				sub.open("GET", 'https://www.youtube.com/api/timedtext?lang='+lang+'&v='+id);
				sub.send();
		  });
		  
		  
			// obtengo los subtítulos disponibles para este video
		  $("button#btn-listar-yt1").on('click', function () {
				var oReq = new XMLHttpRequest();
				oReq.addEventListener("load", function () {
					if (this.readyState == 4 && this.status == 200) {
						var res = oReq.responseText,
								texto = '';
				
						parser = new DOMParser();
						xmlDoc = parser.parseFromString(res,"text/xml");

						var subs = xmlDoc.getElementsByTagName("transcript_list")[0].childNodes;
					
						for (i = 0; i < subs.length; i++)
							texto += subs[i].attributes[4].nodeValue + ', ';
						if (subs.length > 0) texto = texto.slice(0, texto.length - 2);
							document.getElementById('results').innerHTML = 'Cantidad de subtítulos: ' + subs.length + '<br><br>' + texto;
		  		}
				});
			oReq.open("GET", 'https://video.google.com/timedtext?type=list&v='+id);
			oReq.send();
		  });

			var player = videojs('yt1');
			player.markers({
   			breakOverlay:{
      		display: true
   			},
   			onMarkerClick: function(marker){
					$('.dynamic-demo-events').append('<li class="list-group-item">Marker click: '+marker.time+'</li>');
   			},
   			onMarkerReached: function(marker){
					$('.dynamic-demo-events').append('<li class="list-group-item">Marker reached: '+marker.time+'</li>');
   			},
   			markers: [
				]
			});

			// setup control handlers
			$("#btn-am-yt1").click(function(){
				player.markers.prev();
			});

			$("#btn-sm-yt1").click(function(){
				player.markers.next();
			});

			$(".dynamic-demo-shift"). click(function(){
				var markers = player.markers.getMarkers();
				for(var i = 0; i < markers.length; i++) {
					markers[i].time += 1;
				}
				player.markers.updateTime();
			});

			$(".dynamic-demo-remove-first").click(function(){
				player.markers.remove([0]);
			});

			$(".dynamic-demo-remove-all").click(function(){
				player.markers.removeAll();
			});

			$(".dynamic-demo-destroy").click(function(){
				player.markers.destroy();
			});
		});
  });
})(jQuery);


function playPause() {
  var mvp = videojs('yt1');

  if (mvp.paused()) {
    mvp.play();
  }
  else {
    mvp.pause();
  }
  mvp.blur();
  mvp.setAttribute('style', 'z-index:-1');
	//$("#yt1").removeClass("vjs-controls-enabled");
	//$("#yt1").addClass("vjs-controls-disabled");
}

