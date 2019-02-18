require('aframe');
var sceneEl = document.querySelector('a-sky');
var count = 0;

setInterval(()=> {
	count++;
	sceneEl.setAttribute('src',`${count}.jpg`);
	if(count >= 11){
		count = 0;
	}
},500);

