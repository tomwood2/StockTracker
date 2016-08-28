'use strict';

/**
 * @ngdoc function
 * @name stocktrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stocktrackerApp
 */
angular.module('stocktrackerApp')
  .controller('MainCtrl', function (END_POINT, market_data) {

  	var model = this;

  	var portfolioItem = function (symbol, lastPrice, change, percentChange) {
  		this.symbol = symbol;
  		this.lastPrice = lastPrice;
  		this.change = change;
  		this.percentChange = percentChange;
  	};

  	var portfolio = function ()
  	{
  		this.items = new Array();

  		this.columnHeadings = ["Symbol", "Last Price", "Change", "% Change"];

  		this.addItem = function (portfolioItem) {

  			this.items.push(portfolioItem);
  		};
  	};

  	model.portfolio = new portfolio();
  	model.portfolio.addItem(new portfolioItem("jkhy", 88.05, 0.23, .26))
  	model.portfolio.addItem(new portfolioItem("jpm", 66.07, 0.12, .18))

  	model.symbol = "jkhy";
  	model.lookup = function (symbol) {
  		market_data.quote(symbol).then(function (result) {
  			model.quote = result;
  		},
		function (rejection) {
			model.error = rejection.status + ' ' + rejection.statusText;
		})
  	};

  	model.name = END_POINT;
  	model.id = 50;

  	model.quote = null;
  	model.error = null;

  });
