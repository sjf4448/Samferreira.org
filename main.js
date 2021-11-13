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





camera.position.z = 5;

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
		makeStar(getRandomArbitrary(-1000, 1000), getRandomArbitrary(-1000, 1000), getRandomArbitrary(-1000, 10));
	}
}


//number of stars
const stars = 5000;

buildSpace(stars);
scene.add(space);

//mouse raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

//animates things based on raycast aka mouse position
function render() {

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	//loop for hovering
	for ( let i = 0; i < intersects.length; i ++ ) {

		// intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );



//creating my name
// const loader = new GLTFLoader();
//AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
// const loadedData = await loader.loadAsync('pumpkin.gltf');

const loader = new FontLoader();
var nameMesh;
loader.load( 'Fonts/Roboto_Bold.json', function (font){
	const nameGeom = new TextGeometry( 'Sam', {
		font: font,
		size: 10,
		height: 2,
	} );

	const nameMaterial = new THREE.MeshBasicMaterial(({ color: 0xffffff }))
	nameMesh = new THREE.Mesh(nameGeom, nameMaterial);

	scene.add(nameMesh);
	nameMesh.position.x = -15;
	nameMesh.position.y = -5;
	nameMesh.position.z = -100;

});




//switch to true for animation
var jump = true;

//Need to put my name somewhere
//Add a button to activate the effect
//Planets for portfolio pages?
//Goal: Star wars space jump effect

//infinte animation loop
const animate = function () {
	requestAnimationFrame( animate );

	window.requestAnimationFrame(render);

	if(jump == true){
		nameMesh.scale.z += 0.01;
		nameMesh.position.z += 0.1;
		//animates every object in space
		for (var i = 0; i <= stars; i++){
			space.children[i].scale.z += 0.01;
			space.children[i].position.z += 0.1;
		}
	}
	else{
		nameMesh.rotation.x += 0.01;
		nameMesh.rotation.z += 0.01;
		
	}


	
	//Makes the cube stretch on Z-Axis
	// if(group.scale.z <= 20){
	// 	group.scale.setZ(group.scale.z + 0.5);
	// }
	

	renderer.render( scene, camera );
};





//When window is resized stuff dont break
window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

};

//hides srollbar
document.body.style.overflow = 'hidden';

animate();