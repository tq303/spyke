(function(){
	'use strict';

	// MAIN
	
	// standard global variables
	var container, scene, camera, renderer, controls;

	// custom global variables
	var mesh;

	init();
	animate();

	// FUNCTIONS 		
	function init() 
	{
		// SCENE
		scene = new THREE.Scene();
		// CAMERA
		var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
		var VIEW_ANGLE = 45, 
			ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, 
			NEAR = 0.1, 
			FAR = 20000;

		camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
		scene.add(camera);

		camera.position.set(0,150,400);
		camera.lookAt(scene.position);	

		renderer = new THREE.WebGLRenderer( {antialias:true} );

		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

		container = document.getElementById( 'spyke' );
		container.appendChild( renderer.domElement );

		// drag controls
		controls = new THREE.TrackballControls( camera );

		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;

		controls.noZoom = false;
		controls.noPan = false;

		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;

		controls.keys = [ 65, 83, 68 ];

		controls.addEventListener( 'change', render );

		// LIGHT
		var light = new THREE.PointLight(0xffffff);
		light.position.set(100,250,100);
		scene.add(light);

		////////////
		// CUSTOM //
		////////////	
		var gridXZ = new THREE.GridHelper(100, 10);
		gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
		gridXZ.position.set( 100,0,100 );
		scene.add(gridXZ);
	}

	function animate() 
	{
	    requestAnimationFrame( animate );
		render();		
		update();
	}

	function update()
	{
		controls.update();
	}

	function render() 
	{
		renderer.render( scene, camera );
	}

}());