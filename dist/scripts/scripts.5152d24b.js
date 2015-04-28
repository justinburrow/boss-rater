"use strict";angular.module("bossRatingApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/showrating.html",controller:"showRatingCtrl"})}]),angular.module("bossRatingApp").controller("showRatingCtrl",["$scope","$firebaseArray",function(a,b){a.bossRating="";var c=new Firebase("https://jb-boss-rating.firebaseio.com");a.ratings=b(c),a.addRating=function(){a.date=Date.now(),a.ratings.$add({value:a.value,date:a.date}),angular.element(".boss-rater").prop("selectedIndex",0),angular.element(".update").removeClass("ready")};var d=function(){var b=new Date;b.setHours(0,0,0,0),b=b.getTime();for(var c=[],d=0;d<a.ratings.length;d++)a.ratings[d].date>b&&c.push(a.ratings[d]);for(var e=0,f=c.length,g=0;f>g;g++)e+=parseInt(c[g].value);""!==e&&(a.bossRating=(Math.round(e/f*10)/10).toFixed(1));var h=angular.element("#smile-rating"),i="";a.bossRating>=0&&a.bossRating<.5?(i="krampus",a.bossTitle=i,h.removeClass(),h.addClass(i.replace(/\s+/g,"-"))):a.bossRating<1.1?(i="troll",a.bossTitle=i,h.removeClass(),h.addClass(i.replace(/\s+/g,"-"))):a.bossRating<2.1?(i="oscar the grouch",a.bossTitle=i,h.removeClass(),h.addClass(i.replace(/\s+/g,"-"))):a.bossRating<3.1?(i="borderline",a.bossTitle=i,h.removeClass(),h.addClass(i.replace(/\s+/g,"-"))):a.bossRating<4.1?(i="mister rogers",a.bossTitle=i,h.removeClass(),h.addClass(i.replace(/\s+/g,"-"))):a.bossRating<=5&&(i="teddy bear",a.bossTitle=i,h.removeClass(),h.addClass(i.replace(/\s+/g,"-"))),(isNaN(a.bossRating)||""===a.bossRating)&&(a.bossTitle="Not Available",a.bossRating="?",h.removeClass(),h.addClass("empty"))};a.ratings.$loaded(function(){d()}),a.$watch(function(){d()}),angular.element(".boss-rater").change(function(){angular.element(".update").addClass("ready")})}]);