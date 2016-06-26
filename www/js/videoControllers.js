var videoControllers = angular.module('videoControllers',[])

.controller("VideoCtrl", function($scope, $cordovaCapture, videoServices) {
<<<<<<< HEAD
    $scope.video = '';
=======
    $scope.clip = '';
>>>>>>> parent of eb922e3... video preview
 
    $scope.captureVideo = function() {
        $cordovaCapture.captureVideo().then(function(videoData) {
            videoServices.saveVideo(videoData).success(function(data) {
                $scope.clip = data;
                $scope.$apply();
            }).error(function(data) {
                console.log('ERROR: ' + data);
            });
        });
    };
    
<<<<<<< HEAD
    $scope.urlForVideoThumb = function(videoUrl) {
        var name = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
=======
    $scope.urlForClipThumb = function(clipUrl) {
        var name = clipUrl.substr(clipUrl.lastIndexOf('/') + 1);
>>>>>>> parent of eb922e3... video preview
        var trueOrigin = cordova.file.dataDirectory + name;
        var sliced = trueOrigin.slice(0, -4);
        return sliced + '.png';
    }
     
<<<<<<< HEAD
    $scope.showVideo = function(video) {
=======
    $scope.showClip = function(clip) {
        console.log('show clip: ' + clip);
    }
 
})

/*.controller('VideoCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, $ionicModal) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $ionicModal.fromTemplateUrl('templates/search.html', {
        scope: $scope,
        animation: 'slide-in-left'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    
    $scope.showSearch = function() {
        $scope.modal.show();
    };
    
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
    //Variables Generales del Realtor
    $rootScope.realtor = {
        'userid': 73
    };
    
    //Variables Generales del Usuario
    $rootScope.user = {
        'email': 'guilleverag@gmail.com'
    };
})

.controller('HomeCtrl', function($scope, $rootScope, $ionicModal, $ionicLoading, properties) {
    $rootScope.drawMap = true;
    
    $scope.showLoading = function() {
        $ionicLoading.show({
            template: 'Loading properties data...'
        });
    };
    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };
    
    $scope.onResultTabSelect = function(tab){
        $rootScope.tabState = tab;
        $scope.showLoading();
            
        properties.list(function(result){
                      
            $rootScope.propertiesResult = result.records;
            $rootScope.resultPropertiesFound = 'Properties Found: '+(result.total>75 ? 75 : result.total);

            if($rootScope.tabState == 'map' && $rootScope.map){
                var resultTotal = (result.total>75 ? 75 : result.total);
                var records = result.records;

                $rootScope.map.borrarTodoMap();
                
                for(i=0; i<resultTotal; i++){
                    var status = records[i]['status'];
                    var index = status.split('_');
                    status = index[1];
                    
                    $rootScope.map.addPushpinInfoboxMini(
                        records[i]['parcelid'], 
                        records[i]['latitude'],
                        records[i]['longitude'],
                        records[i]['address'],
                        records[i]['lprice'],
                        records[i]['beds'],
                        records[i]['bath'],
                        records[i]['sqft'],
                        lsImgCss[status],
                        '#/app/overview/'+(records[i]['county'])+'/'+(records[i]['parcelid']),
                        lsHexCssPoint[status],
                        records[i]['pid'],
                        records[i]['county']
                    );
                }
                
                $rootScope.map.getCenterPins();
            }
            
            $scope.hideLoading();
        });
        
        
        $scope.$on('$ionicView.enter', function(){
            if($rootScope.tabState == 'map'){
                $rootScope.map.getCenterPins();
            }
        });
>>>>>>> parent of eb922e3... video preview
        
    }
 
});