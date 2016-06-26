var videoControllers = angular.module('videoControllers',[])

.controller("VideoCtrl", function($scope, $cordovaCapture, videoServices) {
    $scope.video = '';
 
    $scope.captureVideo = function() {
        $cordovaCapture.captureVideo().then(function(videoData) {
            videoServices.saveVideo(videoData).success(function(data) {
                $scope.video = data;
                $scope.$apply();
            }).error(function(data) {
                console.log('ERROR: ' + data);
            });
        });
    };
    
    $scope.urlForVideoThumb = function(videoUrl) {
        var name = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        var sliced = trueOrigin.slice(0, -4);
        return sliced + '.png';
    }
     
    $scope.showVideo = function(video) {
        
    }
 
});