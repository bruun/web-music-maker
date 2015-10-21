function getVoiceBlobForDuration(duration) {
    return new Promise(function (resolve) {
        var recorder;
        var getUserMedia = (navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.getUserMedia).bind(navigator);
        getUserMedia({ audio: true, video: false }, function (stream) {
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = function (data) {
                resolve(data.data);
            };
            recorder.start();
            recorder.onstart = function () {
                setTimeout(function () {
                    recorder.stop();
                    stream.getAudioTracks()[0].stop();
                }, duration)
            };
        }, function () {});
    });
}
