(function(){
	'use strict';

	// MAIN
	// standard global variables
	var container, scene, camera, renderer, controls, stats;
	var keyboard = new THREEx.KeyboardState();
	var clock = new THREE.Clock();

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
		var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
		camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
		scene.add(camera);
		camera.position.set(0,150,400);
		camera.lookAt(scene.position);	

		// RENDERER
		if ( Detector.webgl )
			renderer = new THREE.WebGLRenderer( {antialias:true} );
		else
			renderer = new THREE.CanvasRenderer(); 

		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		container = document.getElementById( 'spyke' );
		container.appendChild( renderer.domElement );
		// EVENTS
		THREEx.WindowResize(renderer, camera);
		THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
		// CONTROLS
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		// STATS
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		container.appendChild( stats.domElement );
		// LIGHT
		var light = new THREE.PointLight(0xffffff);
		light.position.set(100,250,100);
		scene.add(light);

		// SKYBOX
		var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
		var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
		var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
		scene.add(skyBox);
		
		////////////
		// CUSTOM //
		////////////	
		var geometry = new THREE.SphereGeometry( 30, 32, 16 );
		var material = new THREE.MeshLambertMaterial( { color: 0x000088 } );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set(40,40,40);
		scene.add(mesh);
		
		var axes = new THREE.AxisHelper(50);
		axes.position = mesh.position;
		scene.add(axes);
		
		var gridXZ = new THREE.GridHelper(100, 10);
		gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
		gridXZ.position.set( 100,0,100 );
		scene.add(gridXZ);
		
		var gridXY = new THREE.GridHelper(100, 10);
		gridXY.position.set( 100,100,0 );
		gridXY.rotation.x = Math.PI/2;
		gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
		scene.add(gridXY);

		var gridYZ = new THREE.GridHelper(100, 10);
		gridYZ.position.set( 0,100,100 );
		gridYZ.rotation.z = Math.PI/2;
		gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
		scene.add(gridYZ);
		
		// direction (normalized), origin, length, color(hex)
		var origin = new THREE.Vector3(50,100,50);
		var terminus  = new THREE.Vector3(75,75,75);
		var direction = new THREE.Vector3().subVectors(terminus, origin).normalize();
		var arrow = new THREE.ArrowHelper(direction, origin, 50, 0x884400);
		scene.add(arrow);
	}

	function animate() 
	{
	    requestAnimationFrame( animate );
		render();		
		update();
	}

	function update()
	{
		if ( keyboard.pressed("z") ) {	// do something

		}
		
		controls.update();
		stats.update();
	}

	function render() 
	{
		renderer.render( scene, camera );
	}


		// each square
		// var planeW = 50; // pixels
		// var planeH = 50; // pixels 
		// var numW = 50; // how many wide (50*50 = 2500 pixels wide)
		// var numH = 50; // how many tall (50*50 = 2500 pixels tall)
		// var plane = new THREE.Mesh(
		//     new THREE.PlaneGeometry( planeW*numW, planeH*numH, planeW, planeH ),
		//     new THREE.MeshBasicMaterial( {
		//         color: 0x000000,
		//         wireframe: true
		//     } )
		// );

		// scene.add(plane);

}());