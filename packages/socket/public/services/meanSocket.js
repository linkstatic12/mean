/*global io:false*/
'use strict';

var baseUrl = 'wss://marcotest2.herokuapp.comd';

angular.module('mean.socket').factory('MeanSocket', function($rootScope) {
	
	
	var socket = io.connect({transports: ['websocket','xhr-polling','jsonp-polling','htmlfile','flashsocket']});
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				console.log('event:', eventName);
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});
