var videoApp = angular.module('videoApp', ['ionic', 'ngCordova'])

.constant('app_config', {
    appName: 'Video App',
    appVersion: 1.0
    //apiUrl: 'http://52.10.82.93/rewards/api/v1/reward_api.php'
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
            templateUrl: "templates/home.html"
        }
      }
    })
    .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
            templateUrl: "templates/about.html"
        }
      }
    })
    .state('app.records', {
      url: "/records",
      views: {
        'menuContent' :{
            templateUrl: "templates/records.html"
        }
      }
    })
    /*.state('app.contact', {
      url: "/contact",
      views: {
        'menuContent' :{
            templateUrl: "templates/contact.html"
        }
      }
    })    
    .state('app.home', {
      abstract: true,  
      views: {
        'menuContent' :{
            templateUrl: "templates/home.html",
            controller: 'HomeCtrl'
        }
      }
    })    
   .state('app.home.map', {
      url: "/home/map",
      views: {
        'map-tab': {
          templateUrl: "templates/map.html",
          controller: 'HomeMapCtrl'
        }
      }
    })
    .state('app.home.result', {
      url: "/home/result",
      views: {
        'result-tab': {
          templateUrl: "templates/result.html",
          controller: 'HomeResultCtrl'
        }
      }
    })
    .state('app.overview', {
      url: "/overview/:county/:pid",
      views: {
        'menuContent': {
          templateUrl: "templates/overview.html",
          controller: 'OverviewCtrl'
        }
      }
    })*/
    
  $urlRouterProvider.otherwise("/app/home");
});