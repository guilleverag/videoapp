var videoControllers = angular.module('videoControllers',[])

.controller("VideoCtrl", function($scope, $ionicModal, $cordovaCapture, videoServices) {
    $scope.video = '';
 
    $scope.captureVideo = function() {
        var options = { limit: 1, duration: 10 };
        
        $cordovaCapture.captureVideo(options).then(function(videoData) {
            videoServices.saveVideo(videoData).success(function(data) {
                $scope.video = data;
                $scope.$apply();
            }).error(function(data) {
                console.log('ERROR: ' + data);
            });
        });
    };
    
    $scope.urlForVideoThumb = function(videoUrl) {
        var name = videoUrl.substr(clipUrl.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        var sliced = trueOrigin.slice(0, -4);
        return sliced + '.png';
    }
    
    $scope.showVideo = function(video) {
        $scope.videoSrc  = video;
        
		$ionicModal.fromTemplateUrl('templates/video.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	}
 
	// Close the modal
	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.modal.remove()
	};
 
});