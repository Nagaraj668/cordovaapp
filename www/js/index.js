document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("navigator.camera: " + JSON.stringify(navigator.camera));
    navigator.camera.cleanup(onSuccess, onFail);

    function onSuccess() {
        console.log("Camera cleanup success.")
    }

    function onFail(message) {
        console.log('Failed because: ' + message);
    }
}

function setOptions(srcType) {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    }
    return options;
}

function openCamera(selection) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);

    navigator.camera.getPicture(function (imageUri) {
        displayImage(imageUri);
        createNewFileEntry(imageUri);
    }, function (error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function displayImage(imgUri) {
    var elem = document.getElementById('myImage');
    elem.src = imgUri;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('open_camera_btn').addEventListener('click', openCamera);
});

function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
        dirEntry.getFile("tempFile.jpeg", {
            create: true,
            exclusive: false
        }, function (fileEntry) {
            console.log("got file: " + fileEntry.fullPath);
        }, onErrorCreateFile);

    }, onErrorResolveUrl);
}