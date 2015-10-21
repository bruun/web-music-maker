function getVoiceBlobForDuration(duration) {
    return new Promise(function (resolve) {
        var recorder;
        navigator.mozGetUserMedia({ audio: true, video: false }, function (stream) {
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = function (data) {
                resolve(data.data);
            };
            recorder.start();
            recorder.onstart = function () {
                setTimeout(function () {
                    recorder.stop();
                }, duration)
            };
        }, function () {});
    });
}
