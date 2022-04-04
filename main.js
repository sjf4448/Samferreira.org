import * as THREE from 'https://cdn.skypack.dev/three@0.134.0'
import {TextGeometry} from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/geometries/TextGeometry.js'
import {FontLoader} from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/FontLoader'

//creates scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


//Creates renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var depth = 5
camera.position.z = depth;


//DIDNT MAKE THIS BUT ITS USEFUL AF
const visibleHeightAtZDepth = ( depth, camera ) => {
	// compensate for cameras not positioned at z=0
	const cameraOffset = camera.position.z;
	if ( depth < cameraOffset ) depth -= cameraOffset;
	else depth += cameraOffset;
  
	// vertical fov in radians
	const vFOV = camera.fov * Math.PI / 180; 
  
	// Math.abs to ensure the result is always positive
	return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
  };
  
  const visibleWidthAtZDepth = ( depth, camera ) => {
	const height = visibleHeightAtZDepth( depth, camera );
	return height * camera.aspect;
  };






const space = new THREE.Group();

//Used to make the cubes that will be used for stars
function makeStar(posX, posY, posZ){

	var geometry = new THREE.SphereGeometry()
	var material = new THREE.MeshBasicMaterial(({ color: 0xffffff }));

	//for(var i = 0; i <= n; i++){
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = posX;
		mesh.position.y = posY;
		mesh.position.z = posZ;


		space.add(mesh);
	//}
}

function getRandomArbitrary(min, max) {
	var num = Math.random() * (max - min) + min
	if(num > 0 && num < 10){
		num += 50
	}
	else if(num < 0 && num > -10){
		num -= 50
	}
	return num;
  }

function buildSpace(n){
	for(var i = 0; i <= n; i++){
		var z = getRandomArbitrary(-1000, -75);
		var x = getRandomArbitrary(visibleWidthAtZDepth(z, camera)/2 * -1 - 20, visibleWidthAtZDepth(z, camera)/2 + 20);
		var y = getRandomArbitrary(visibleHeightAtZDepth(z, camera)/2 * -1 - 20, visibleHeightAtZDepth(z, camera)/2 + 20);
		makeStar(x, y, z - 10);
	}
}


//number of stars
const stars = camera.aspect * 300;

buildSpace(stars);
scene.add(space);

////Raycasting and mouse stuff
// //mouse raycasting
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// function onMouseMove( event ) {

// 	// calculate mouse position in normalized device coordinates
// 	// (-1 to +1) for both components

// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

// }

// //animates things based on raycast aka mouse position
// function render() {

// 	// update the picking ray with the camera and mouse position
// 	raycaster.setFromCamera( mouse, camera );

// 	// calculate objects intersecting the picking ray
// 	const intersects = raycaster.intersectObjects( scene.children );

// 	//loop for hovering
// 	for ( let i = 0; i < intersects.length; i ++ ) {
// 			//intersects[ i ].object.material.color.set( 0xff0000 );

// 	}

// 	renderer.render( scene, camera );

// }

// window.addEventListener( 'mousemove', onMouseMove, false );



//creating my name
// const loader = new GLTFLoader();
//AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
// const loadedData = await loader.loadAsync('pumpkin.gltf');

const Text = new THREE.Group;



export function newText(text, fontsrc, size, height, posx, posy, posz, group){
	var loader = new FontLoader();
	var nameMesh;
	loader.load( fontsrc, function (font){
	var nameGeom = new TextGeometry( text, {
		font: font,
		size: size,
		height: height,
	} );

	var nameMaterial = new THREE.MeshBasicMaterial(({ color: 0xffffff }))
	nameMesh = new THREE.Mesh(nameGeom, nameMaterial);
	

	
	nameMesh.position.x = posx;
	nameMesh.position.y = posy;
	nameMesh.position.z = posz;

	group.add(nameMesh);

});
}

//creates text that says "Sam" in Text group @ index 0
//fix so it returns the index
newText('Sam', './Fonts/Roboto_Bold.json', 10, 2, -13, -5, -100, Text);

newText('Click to enter', './Fonts/Roboto_Bold.json', 6, 2, -24, -20, -100, Text);

scene.add(Text);

//switch to true for animation
var jump = false;

//Need to put my name somewhere
//Add a button to activate the effect
//Planets for portfolio pages?
//Goal: Star wars space jump effect

document.onclick= function(event){
	jump = true;
}

//infinte animation loop
const animate = function () {
	requestAnimationFrame( animate );


	if(jump == true){
		//animates every object in space
		Text.clear();
		
		for (var i = 0; i <= stars; i++){
			if(space.children[i].scale.z < 100){
				space.children[i].scale.z += 0.6;
			}
			space.children[i].position.z += 2.3;
		}
	}
	else{
		//Text.children[0].rotation.y += 0.01;
		
	}


	

	

	renderer.render( scene, camera );
};





//When window is resized stuff dont break
window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  space.clear();
  buildSpace(stars);

};

//hides srollbar
document.body.style.overflow = 'hidden';

animate();