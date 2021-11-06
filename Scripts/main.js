const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//creates cube object
//3D shapes require a geometry and material these go into a Mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(3, 0, 0);

//Adds cube to scene
scene.add(cube);

camera.position.z = 5;

const animate = function () {
	requestAnimationFrame( animate );

	//rotates cube object
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	
	//Makes the cube stretch on Z-Axis
	// if(group.scale.z <= 20){
	// 	group.scale.setZ(group.scale.z + 0.5);
	// }
	

	renderer.render( scene, camera );
};

animate();

//Need to create a function for generating cubes
//Need to put my name somewhere
//Add a button to activate the effect
//Planets for portfolio pages?
//Goal: Star wars space jump effect


window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

};

document.body.style.overflow = 'hidden';