/**
 * @author oliver white
 * @description three.js keyboard camera tilting functionality
 */

(function(window, THREE) {
	'use strict';

	THREE.tiltControl = function (camera, domElement) {

		var _this = this;

		this.camera = camera;
		this.domElement = (typeof domElement !== 'undefined') ? domElement : document;

		this.enabled = false;

		this.keys = {
			'up': 60,
			'down': 61
		};

		// listeners
		function keydown( event ) {
			window.console.log('re');
			window.removeEventListener( 'keydown', keydown );
		}

		function keyup( event ) {
			window.addEventListener( 'keydown', keydown, false );
		}

		window.addEventListener( 'keydown', keydown, false );
		window.addEventListener( 'keyup', keyup, false );
	};

}(window, THREE));