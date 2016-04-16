
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

var Paris = {lat: 48.8589506, lng: 2.2773462};

var subPosts = document.querySelectorAll('.sub .post');

var closerInPx = 50;
var furtherInPx = 900;
var furtherInKm = 5;

for (var i = 0; i < subPosts.length; i++) {
	var post = subPosts[i];
	console.log(post)

	var postLat = post.getAttribute('data-lat');
	var postLng = post.getAttribute('data-lng');

	var xDirection = (postLat < Paris.lat ? -1 : 1);
	var yDirection = (postLng < Paris.lng ? -1 : 1);

	console.log(xDirection, yDirection);
	var xDistance = distance(postLat, Paris.lng, Paris.lat, Paris.lng);
	var yDistance = distance(Paris.lat, postLng, Paris.lat, Paris.lng);

	post.childNodes[2].innerHTML = 'x: '+xDistance * xDirection+',<br/> y: '+yDistance * yDirection;

	var xProgress = xDistance / furtherInKm;
	var yProgress = yDistance / furtherInKm;

	// xProgress = xProgress > 1 ? 1 : (xProgress < -1 ? -1 : xProgress);
	// yProgress = yProgress > 1 ? 1 : (yProgress < -1 ? -1 : yProgress);

	xInPx = ((furtherInPx - closerInPx) * xProgress + closerInPx) * xDirection;
	yInPx = ((furtherInPx - closerInPx) * yProgress + closerInPx) * yDirection;

	post.style.left = xInPx +'px';
	post.style.top = -yInPx +'px';


}
