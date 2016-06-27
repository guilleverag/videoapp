var videoControllers = angular.module('videoControllers',[])

.controller("VideoCtrl", function($scope, $ionicModal, $timeout, $cordovaCapture, videoServices) {
    $scope.video = '';
 
    $scope.captureVideo = function() {
        var options = { limit: 1, duration: 10 };
        
        window.Plugin.backgroundvideo.start('currentvideo', 'front', null, null);
        
        var mytimeout = $timeout(function(){
            $timeout.cancel(mytimeout);
            window.Plugin.backgroundvideo.stop(function(videoData) {
                $scope.debugText = videoData;
                
                videoServices.saveVideo(videoData).success(function(data) {
                    $scope.video = data;
                    $scope.debugText = data;
                    $scope.$apply();
                });
            }, function(data){
               console.log('ERROR: ' + data); 
            });
        },options.duration*1000);
        
        
        /*window.plugins.videocaptureplus.captureVideo(
            function(videoData) {
                videoServices.saveVideo(videoData).success(function(data) {
                    $scope.video = data;
                    $scope.$apply();
                });
            }, // your success callback
            function(data){
               console.log('ERROR: ' + data); 
            },   
            {
                limit: 1, // the nr of videos to record, default 1 (on iOS always 1)
                duration: 10, // max duration in seconds, default 0, which is 'forever'
                highquality: true, // set to true to override the default low quality setting
                frontcamera: true
            }
        );*/
        
        /*$cordovaCapture.captureVideo(options).then(function(videoData) {
            videoServices.saveVideo(videoData).success(function(data) {
                $scope.video = data;
                $scope.$apply();
            }).error(function(data) {
                console.log('ERROR: ' + data);
            });
        });*/
    };
    
    $scope.urlForVideoThumb = function(videoUrl) {
        var name = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        var sliced = trueOrigin.slice(0, -4);
        return sliced + '.png';
    }
    
    $scope.showVideo = function(video) {
        $scope.videoSrc  = video;
        
        VideoPlayer.play(video);
        
		/*$ionicModal.fromTemplateUrl('templates/video.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});*/
	}
 
	/*// Close the modal
	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.modal.remove()
	};*/
 
});