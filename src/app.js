/**
 * spyke
 * @author: Oliver White 
 */
(function(window, angular, spyke, undefined){
	'use strict';

	angular.module('App', [])
		.controller('MainCtrl', ['$interval', MainCtrl]);

	function MainCtrl($interval) {
		var vm = this;

		vm.controlOutput = [
			{
				'title': 'rotation',
				'attrs': [
					{'title': 'x', 'value': null },
					{'title': 'y', 'value': null },
					{'title': 'z', 'value': null }
				]
			},
			{
				'title': 'position',
				'attrs': [
					{'title': 'x', 'value': null },
					{'title': 'y', 'value': null },
					{'title': 'z', 'value': null }
				]
			}
		];

		// update output variables
		$interval(function () {
			vm.controlOutput[0].attrs[0].value = spyke.camera.position.x.toFixed(4);
			vm.controlOutput[0].attrs[1].value = spyke.camera.position.y.toFixed(4);
			vm.controlOutput[0].attrs[2].value = spyke.camera.position.x.toFixed(4);
		}, 16);
	}

}(window, window.angular, spyke));