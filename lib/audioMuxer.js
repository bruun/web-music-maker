function muxAudioBlobs(blobs) {
    // lol this was too easy
    return new Blob(blobs, { 'type' : 'audio/ogg; codecs=opus' });
}
