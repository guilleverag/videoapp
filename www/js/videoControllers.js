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
        
    }
    
    $rootScope.tabState = 'map';
    
    $scope.searchParams = {
        'search': '',
        'county': '1',
        'tsearch': 'location',
        'proptype': '',
        'price_low': '',
        'price_hi': '',
        'bed': '-1',
        'bath': '-1',
        'sqft': '-1',
        'pequity': -1,
        'pendes': -1,
        'search_type': 'FS',
        'search_mapa': '-1',
        'occupied': -1
    };
    
    $scope.closeSearch = function() {
        $scope.modal.hide();
        
        properties.search(function(){
            $scope.onResultTabSelect($rootScope.tabState);
        }, $scope.searchParams)
    };
})

.controller('HomeMapCtrl', function($scope, $rootScope, properties) {
    
    navigator.geolocation.getCurrentPosition(function(pos) {
        var containerMapPrincipal = new XimaMap('containerMapPrincipal','containerMapPrincipal_search_latlong','control_mapa_div','_pan','_draw','_poly','_clear','_maxmin','_circle');
        
        console.log(pos.coords.latitude, pos.coords.longitude);
        containerMapPrincipal._IniMAP(pos.coords.latitude, pos.coords.longitude);
        
        $rootScope.latitude  = pos.coords.latitude;
        $rootScope.longitude = pos.coords.longitude;
        $rootScope.map = containerMapPrincipal;
    });
})

.controller('HomeResultCtrl', function($scope, $rootScope, properties) {
    $scope.like = function(pid, county) {
        var optLike = {
            'useridr': $rootScope.realtor.userid,
            'email': $rootScope.user.email,
            'pid': pid,
            'county': county
        };
        
        properties.like(function(){
            
        },optLike);
    }
    
    $scope.isLike = function(pid,county) {
        var optLike = {
            'useridr': $rootScope.realtor.userid,
            'email': $rootScope.user.email,
            'pid': pid,
            'county': county
        };
        
        properties.isLike(function(res){
            return res;
        },optLike);
    }
    
    $scope.getColor = function(status,type){
        var index = status.split('_');
        status = index[1];
        
        if(type=='Bg'){
            return lsHexCssPoint[status].color;
        }else
            return lsHexCssPoint[status].border;
    }
    
    $scope.getIndex = function(status){
        var index = status.split('_');
        
        return index[0];
    }
})

.controller('OverviewCtrl', function($scope, $rootScope, $stateParams, $ionicHistory, properties) {
    $scope.pid = $stateParams.pid;
    $scope.county = $stateParams.county;
    $scope.imageW = window.innerWidth < 500 ? '100%' : 350;
    $scope.imageH = window.innerWidth < 500 ? 250 : 250;
    $scope.imageShow = true;
    
    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    };
    
    $scope.like = function() {
        var optLike = {
            'useridr': $rootScope.realtor.userid,
            'email': $rootScope.user.email,
            'pid': $stateParams.pid,
            'county': $stateParams.county
        };
        
        properties.like(function(){},optLike);
    }
    
    $scope.getColor = function(status,type){
        var index = status.split('_');
        status = index[1];
        
        if(type=='Bg'){
            return lsHexCssPoint[status].color;
        }else
            return lsHexCssPoint[status].border;
    }
    
    $scope.getIndex = function(status){
        var index = status.split('_');
        
        return index[0];
    }
    
    $scope.getDateFormat = function(da){
        var y = da.substring(0,4);
        var m = da.substring(4,6);
        var d = da.substring(6,8);
        
        var textDate = y+'-'+m+'-'+d;
        return new Date(textDate);
    }
    
    properties.overview(function(result){
        $scope.overview = result;
        
        if(result.images.length == 0) $scope.imageShow = false;
        
        var optComp = {
            'array_taken': '',
            'bd': result.property.bd,
            'dir': 'ASC',
            'filter': '',
            'id': $stateParams.pid,
            'limit': 50,
            'prop': result.property.xcode,
            'reset': true,
            'sort': 'Distance',	
            'start': 0,
            'status': 'CS,CC',
            'type': 'nobpo',
            'userid': $rootScope.realtor.userid,
            'typeComp': 'comp',
            'jsonapps': true
        };
        
        properties.comparables(function(res){
            $scope.compData = res.records;
        },optComp);
        
        optComp.status = 'A';
        
        properties.comparables(function(res){
            $scope.compActData = res.records;
        },optComp);
        
        optComp.typeComp = 'rental';
        
        properties.comparables(function(res){
            $scope.compRenData = res.records;
        },optComp);
        
        
    }, $scope.county, $scope.pid);
})*/;