angular.module('videoFactory', [])
    .factory('videoServices', function($http, $q, $httpParamSerializer){
        var deferred = $q.defer();
        var promise = deferred.promise;
         
        promise.success = function(fn) {
            promise.then(fn);
            return promise;
        }
        promise.error = function(fn) {
            promise.then(null, fn);
            return promise;
        }
        
        // Resolve the URL to the local file
        // Start the copy process
        function createFileEntry(fileURI) {
            /*window.resolveLocalFileSystemURL(fileURI, function(entry) {
                return copyFile(entry);
            }, fail);*/
            var name = fileURI.substr(fileURI.lastIndexOf('/') + 1);
            var newName = makeid() + name;

            $cordovaFile.createFile(cordova.file.dataDirectory,newName,true).then(function(succ){
                return onCopySuccess(succ);
            })

        }
         
        // Create a unique name for the videofile
        // Copy the recorded video to the app dir
        function copyFile(fileEntry) {
            var name = fileEntry.substr(fileEntry.lastIndexOf('/') + 1);
            var newName = makeid() + name;
            //deferred.resolve(newName);
         
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                    fileEntry.copyTo(fileSystem2, newName, function(succ) {
                        return onCopySuccess(succ);
                    }, fail);
                },
                fail
            );
        }
         
        // Called on successful copy process
        // Creates a thumbnail from the movie
        // The name is the moviename but with .png instead of .mov
        function onCopySuccess(entry) {
            var name = entry.nativeURL.slice(0, -4);
            window.PKVideoThumbnail.createThumbnail (entry.nativeURL, name + '.png', function(prevSucc) {
                return prevImageSuccess(prevSucc);
            }, fail);
        }
         
        // Called on thumbnail creation success
        // Generates the currect URL to the local moviefile
        // Finally resolves the promies and returns the name
        function prevImageSuccess(succ) {
            var correctUrl = succ.slice(0, -4);
            correctUrl += '.MOV';
            deferred.resolve(correctUrl);
        }
         
        // Called when anything fails
        // Rejects the promise with an Error
        function fail(error) {
            console.log('FAIL: ' + error.code);
            deferred.resolve('ERROR');
        }
         
        // Function to make a unique filename
        function makeid() {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i=0; i < 5; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
         
        // The object and functions returned from the Service
        return {
            // This is the initial function we call from our controller
            // Gets the videoData and calls the first service function
            // with the local URL of the video and returns the promise
            saveVideo: function(data) {
                createFileEntry(data);
                return promise;
            }
        }
    }
);