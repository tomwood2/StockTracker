angular.module('stocktrackerApp').service('market_data', ['$http', '$q', 'END_POINT', '$log', function ($http, $q, END_POINT, $log) {

	var market_data = this;	// service

	market_data.quote = function (symbol) {

		/*
		Methods:
		resolve(value) – resolves the derived promise with the value. If the value is a rejection constructed via $q.reject, the promise will be rejected instead.
		reject(reason) – rejects the derived promise with the reason. This is equivalent to resolving it with a rejection constructed via $q.reject.
		notify(value) - provides updates on the status of the promise's execution. This may be called multiple times before the promise is either resolved or rejected.
		Properties:
		promise – {Promise} – promise object associated with this deferred.
		*/
		
		var url = END_POINT + '/MODApis/Api/v2/Quote/jsonp?symbol=' + symbol + "&&callback=JSON_CALLBACK";
//		var getPromise = $http.get("http://jsonplaceholder.typicode.com/posts/50");
//		var getPromise = $http.get("http://dev.markitondemand.com/MODApis/Api/v2/Quote/jkhy");
		//var getPromise = $http.get(url);

		var JSON_CALLBACK = function (response) {
			console.log("Callback function called");
		};

		var getPromise = $http.jsonp(url);
		//var getPromise = $http.jsonp("http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=jkhy&&callback=JSON_CALLBACK");
//		var getPromise = $http.jsonp("http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=G&&callback=JSON_CALLBACK");

		// then also returns a promise for chaining
		return getPromise.then(function (result) {
			return result.data; // in this case the data property contains a user object w/ userId, id, title and body properties
			//			deferred.resolve(result);
		},
			function (rejectionReason) {

				// we transform the $http error to a
				// rejection object and throw it so
				// that chained promises will receive that
				// in their error methods

				var rejection = {
					status: rejectionReason.status,
					statusText: rejectionReason.statusText
				};

				$log.error(rejectionReason);
				throw rejection;
			});

		//		return getPromise;
	};

	return market_data;
}]);

angular.module('stocktrackerApp').constant('END_POINT', 'http://dev.markitondemand.com');
