'use strict';

/**
 * @ngdoc overview
 * @name bossRatingApp
 * @description
 * # bossRatingApp
 *
 * Main module of the application.
 */
angular
  .module('bossRatingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/showrating.html',
        controller: 'showRatingCtrl'
      });
  });
