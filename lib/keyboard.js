(function initAudio () {
    // create web audio api context
    var audioCtx = new window.AudioContext();

    // create Oscillator node
    var squareOscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.5;

    squareOscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    function SquareWave(frequency) {
        var oscillator = audioCtx.createOscillator();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'square';
        oscillator.frequency.value = frequency;

        this.start = function () {
            oscillator.start();
        }
        this.stop = function () {
            oscillator.stop();
        }
    }



    function SquareWaveFunc (resolution, func) {
        if (!func) {
            return;
        }

        var oscillator = audioCtx.createOscillator();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'square';
        var interval;

        this.start = function () {
            interval = setInterval(function () {
                oscillator.frequency.value = func();
            }, resolution);
            oscillator.start();
        }
        this.stop = function () {
            clearInterval(interval);
            oscillator.stop();
        }
    }


    var s = new SquareWaveFunc(500, function () {
        var val = Math.round(Math.random() * 1000);
        return val;
    });
    //s.start();

    function TriangleWave(frequency) {
        var oscillator = audioCtx.createOscillator();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'triangle';
        oscillator.frequency.value = frequency;

        this.start = function () {
            oscillator.start();
        }
        this.stop = function () {
            oscillator.stop();
        }
    }

    function SawtoothWave(frequency) {
        var oscillator = audioCtx.createOscillator();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sawtooth';
        oscillator.frequency.value = frequency;

        this.start = function () {
            oscillator.start();
        }
        this.stop = function () {
            oscillator.stop();
        }
    }


    function SineWave(frequency) {
        var oscillator = audioCtx.createOscillator();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        this.start = function () {
            oscillator.start();
        }
        this.stop = function () {
            oscillator.stop();
        }
    }


    function noise(durationInMs, frequency) {
        var resolution = .125; // 2/16

        // 0: -1; -.875
        // 1: -.875; -.750
        // ...

        frequency = frequency || 7;

        seed = resolution * frequency;
        seed = 2;

        durationInMs = durationInMs || 0.02;    
        var channels = 2;
        var frameCount = audioCtx.sampleRate * durationInMs;

        var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
      // Fill the buffer with white noise;
      //just random values between -1.0 and 1.0
      for (var channel = 0; channel < channels; channel++) {
       // This gives us the actual ArrayBuffer that contains the data
       var nowBuffering = myArrayBuffer.getChannelData(channel);
       for (var i = 0; i < frameCount; i++) {
         // Math.random() is in [0; 1.0]
         // audio needs to be in [-1.0; 1.0]
         nowBuffering[i] = Math.random() * seed - 1;
       }
      }

      // Get an AudioBufferSourceNode.
      // This is the AudioNode to use when we want to play an AudioBuffer
      var source = audioCtx.createBufferSource();
      // set the buffer in the AudioBufferSourceNode
      source.buffer = myArrayBuffer;
      // connect the AudioBufferSourceNode to the
      // destination so we can hear the sound
      source.connect(audioCtx.destination);
      // start the source playing
      source.start();
    }


    function toneToFrequency (tone, octave) {
        octave = octave || 4;
        map = {
        '0': {
            'C': 16.35,
            'Cs': 17.32,
            'D': 18.35,
            'Ds': 19.45,
            'E': 20.60,
            'F': 21.83,
            'Fs': 23.12,
            'G': 24.50,
            'Gs': 25.96,
            'A': 27.50,
            'As': 29.14,
            'B': 30.87,
        },

        '1': {
            'C': 32.70,
            'Cs': 34.65,
            'D': 36.71,
            'Ds': 38.89,
            'E': 41.20,
            'F': 43.65,
            'Fs': 46.25,
            'G': 49.00,
            'Gs': 51.91,
            'A': 55.00,
            'As': 58.27,
            'B': 61.74,
        },

        '2': {
            'C': 65.41,
            'Cs': 69.30,
            'D': 73.42,
            'Ds': 77.78,
            'E': 82.41,
            'F': 87.31,
            'Fs': 92.50,
            'G': 98.00,
            'Gs': 103.83,
            'A': 110.00,
            'As': 116.54,
            'B': 123.47,
        },

        '3': {
            'C': 130.81,
            'Cs': 138.59,
            'D': 146.83,
            'Ds': 155.56,
            'E': 164.81,
            'F': 174.61,
            'Fs': 185.00,
            'G': 196.00,
            'Gs': 207.65,
            'A': 220.00,
            'As': 233.08,
            'B': 246.94,
        },

        '4': {
            'C': 261.63,
            'Cs': 277.18,
            'D': 293.66,
            'Ds': 311.13,
            'E': 329.63,
            'F': 349.23,
            'Fs': 369.99,
            'G': 392.00,
            'Gs': 415.30,
            'A': 440.00,
            'As': 466.16,
            'B': 493.88,
        },

        '5': {
            'C': 523.25,
            'Cs': 554.37,
            'D': 587.33,
            'Ds': 622.25,
            'E': 659.25,
            'F': 698.46,
            'Fs': 739.99,
            'G': 783.99,
            'Gs': 830.61,
            'A': 880.00,
            'As': 932.33,
            'B': 987.77,
        },

        '6': {
            'C': 1046.50,
            'Cs': 1108.73,
            'D': 1174.66,
            'Ds': 1244.51,
            'E': 1318.51,
            'F': 1396.91,
            'Fs': 1479.98,
            'G': 1567.98,
            'Gs': 1661.22,
            'A': 1760.00,
            'As': 1864.66,
            'B': 1975.53,
        },

        '7': {
            'C': 2093.00,
            'Cs': 2217.46,
            'D': 2349.32,
            'Ds': 2489.02,
            'E': 2637.02,
            'F': 2793.83,
            'Fs': 2959.96,
            'G': 3135.96,
            'Gs': 3322.44,
            'A': 3520.00,
            'As': 3729.31,
            'B': 3951.07,
        },
        '8': {
            'C': 4186.01,
            'Cs': 4434.92,
            'D': 4698.63,
            'Ds': 4978.03,
            'E': 5274.04,
            'F': 5587.65,
            'Fs': 5919.91,
            'G': 6271.93,
            'Gs': 6644.88,
            'A': 7040.00,
            'As': 7458.62,
            'B': 7902.13,
        }
    }
        if (tone[1] === 's' && !map[octave][tone]) {
            tone = tone[0];
        }
        return map[octave][tone];
    } 

    var octaves = {
        square: 4,
        sine: 4,
        sawtooth: 4,
        triangle: 4
    }
    function octaveShift (type, change) {
        octaves[type] = octaves[type] + change;

        if (octaves[type] > 8) {
            octaves[type] = 8;
        }
        if (octaves[type] < 0) {
            octaves[type] = 0;
        }
    }


    // keylistener
    var keyListener = {
        65: {tone: 'C', isPlaying: false, type: 'square'},
        83: {tone: 'D', isPlaying: false, type: 'square'},
        68: {tone: 'E', isPlaying: false, type: 'square'},
        70: {tone: 'F', isPlaying: false, type: 'square'},
        71: {tone: 'G', isPlaying: false, type: 'square'},
        72: {tone: 'A', isPlaying: false, type: 'square'},
        74: {tone: 'B', isPlaying: false, type: 'square'},

        90: {tone: 'C', isPlaying: false, type: 'sine'},
        88: {tone: 'D', isPlaying: false, type: 'sine'},
        67: {tone: 'E', isPlaying: false, type: 'sine'},
        86: {tone: 'F', isPlaying: false, type: 'sine'},
        66: {tone: 'G', isPlaying: false, type: 'sine'},
        78: {tone: 'A', isPlaying: false, type: 'sine'},
        77: {tone: 'B', isPlaying: false, type: 'sine'},

        81: {tone: 'C', isPlaying: false, type: 'triangle'},
        87: {tone: 'D', isPlaying: false, type: 'triangle'},
        69: {tone: 'E', isPlaying: false, type: 'triangle'},
        82: {tone: 'F', isPlaying: false, type: 'triangle'},
        84: {tone: 'G', isPlaying: false, type: 'triangle'},
        89: {tone: 'A', isPlaying: false, type: 'triangle'},
        85: {tone: 'B', isPlaying: false, type: 'triangle'},
    }

    document.addEventListener('keydown', function (evt) {
        switch(evt.which) {
            case 73:
                return octaveShift('triangle', 1);
                break;
            case 79:
                return octaveShift('triangle', -1);
                break;
            case 75:
                return octaveShift('square', 1);
                break;
            case 76:
                return octaveShift('square', -1);
                break;
            case 188:
                return octaveShift('sine', 1);
                break;
            case 190:
                return octaveShift('sine', -1);
                break;
            case 219:
                return noise(.03, 3);
                break;
        }

        var key = keyListener[evt.which];
        if (!key) {
            return;
        }

        if (key.isPlaying) {
            return;
        }

        key.isPlaying = true;

        currentOctave = '' + octaves[key.type];
        var tone = key.tone;

        if (evt.shiftKey) {
            tone = tone + 's';
        }

        if(key.type === 'square') {
            key.note = new SquareWave(toneToFrequency(tone, currentOctave));    
        }
        if (key.type === 'triangle') {
            key.note = new TriangleWave(toneToFrequency(tone, currentOctave));   
        }
        if (key.type === 'sawtooth') {
            key.note = new TriangleWave(toneToFrequency(tone, currentOctave));   
        }
        if (key.type === 'sine') {
            key.note = new SineWave(toneToFrequency(tone, currentOctave));   
        }


        key.note.start();
    });

    document.addEventListener('keyup', function (evt) {
        var key = keyListener[evt.which];
        if (!key) {
            return;
        }

        key.note.stop();
        delete key.note;

        key.isPlaying = false;
    });

})()
