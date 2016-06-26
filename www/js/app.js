var videoApp = angular.module('videoApp', ['ionic', 'ngCordova','videoControllers','videoFactory'])

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
    
  $urlRouterProvider.otherwise("/app/home");
});