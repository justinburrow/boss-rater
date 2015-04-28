/*global Firebase */
'use strict';

/**
 * @ngdoc function
 * @name bossRatingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bossRatingApp
 */
angular.module('bossRatingApp')
  .controller('showRatingCtrl', function ($scope, $firebaseArray) {

  	$scope.bossRating = '';

  	/* Get the Firebase array and set it to $scope.ratings */
    var ref = new Firebase('https://jb-boss-rating.firebaseio.com');
    $scope.ratings = $firebaseArray(ref);

    /* Add the selected rating to the Firebase array*/
    $scope.addRating = function() {
    	$scope.date =  Date.now();
    	$scope.ratings.$add({ value: $scope.value, date: $scope.date });
    	angular.element('.boss-rater').prop('selectedIndex',0);
    	angular.element('.update').removeClass('ready');
    };


    var rateCalc = function() {

    	/* Get the current date, set it to zero hours, only select objects from the array that have a timestamp greater than today at zero hours*/
    	var curDate = new Date();
    	curDate.setHours(0,0,0,0);
    	curDate = curDate.getTime();

    	/*Push today's ratings to a new array*/
    	var todayRatings = [];
    	for (var j=0; j < $scope.ratings.length; j++) {
    		if ($scope.ratings[j].date > curDate) {
    			todayRatings.push($scope.ratings[j]);
    		}
    	}

    	var avgRatingTotal = 0;
    	var numRatings = todayRatings.length;

    	/* Iterate through the new array, adding the rating value, as long as the avgRatingTotal is not blank, round it to one decimal place*/
    	for(var i=0; i<numRatings; i++){
    		avgRatingTotal = (avgRatingTotal + parseInt(todayRatings[i].value));
      	}
      	if ( avgRatingTotal !== '') {
      		$scope.bossRating = (Math.round( ( avgRatingTotal / numRatings) * 10) / 10).toFixed(1);
      	}
      	

      	var smileFace = angular.element('#smile-rating');
      	var rateDesc = '';

      	/* if/else conditions to set classes and titles for the various bossRating ranges*/
      	if ( $scope.bossRating >= 0 && $scope.bossRating < 0.5 ) {
			rateDesc = 'krampus';
    		$scope.bossTitle = rateDesc;
    		smileFace.removeClass();
			smileFace.addClass(rateDesc.replace(/\s+/g, '-'));
    	} else
    	if ( $scope.bossRating < 1.1 ) {
    		rateDesc = 'troll';
    		$scope.bossTitle = rateDesc;
    		smileFace.removeClass();
			smileFace.addClass(rateDesc.replace(/\s+/g, '-'));
    	} else
    	if ( $scope.bossRating < 2.1 ) {
    		rateDesc = 'oscar the grouch';
    		$scope.bossTitle = rateDesc;
    		smileFace.removeClass();
			smileFace.addClass(rateDesc.replace(/\s+/g, '-'));
    	} else
    	if ( $scope.bossRating < 3.1 ) {
    		rateDesc = 'borderline';
    		$scope.bossTitle = rateDesc;
    		smileFace.removeClass();
			smileFace.addClass(rateDesc.replace(/\s+/g, '-'));
    	} else
    	if ( $scope.bossRating < 4.1 ) {
    		rateDesc = 'mister rogers';
    		$scope.bossTitle = rateDesc;
    		smileFace.removeClass();
			smileFace.addClass(rateDesc.replace(/\s+/g, '-'));
    	} else
    	if ( $scope.bossRating <= 5 ) {
    		rateDesc = 'teddy bear';
    		$scope.bossTitle = rateDesc;
    		smileFace.removeClass();
			smileFace.addClass(rateDesc.replace(/\s+/g, '-'));
    	}
    	if ( isNaN($scope.bossRating) || $scope.bossRating === '' ) {
      		$scope.bossTitle = 'Not Available';
      		$scope.bossRating = '?';
      		smileFace.removeClass();
      		smileFace.addClass('empty');
      	}
	};

	/* Run rateCalc when the Firebase array is loaded*/
	$scope.ratings.$loaded ( function() {
		rateCalc();
    });

	/* Run rateCalc when the Firebase array changes */
    $scope.$watch(function() {
    	rateCalc();
    });

    angular.element('.boss-rater').change( function() {
    	angular.element('.update').addClass('ready');
    });

 });