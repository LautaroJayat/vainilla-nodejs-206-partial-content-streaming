const button = document.getElementsByTagName('button');
    const player = document.getElementById('player-container');

    button[0].addEventListener('click', () => {
        removeAllMedia();
        createVideo();

    });

    button[1].addEventListener('click', () => {
        removeAllMedia();
        createAudio();
    })

    function removeAllMedia() {
        let videos = document.getElementsByTagName('video');

        for (let i = 0; i < videos.length; i++) {
            videos[i].remove()
        }
        let audios = document.getElementsByTagName('audio');
        for (let i = 0; i < audios.length; i++) {
            audios[i].remove();
        }
    }
    function createVideo() {
        let video = document.createElement('video');
        video.src = "/media/banjo.mp4";
        video.type = "video/mp4";
        video.controls = true;
        player.append(video);
    }
    function createAudio() {
        let audio = document.createElement('audio');
        audio.src = "/media/banjo.mp3";
        audio.type = "audio/mpeg";
        audio.controls = true;
        player.append(audio);
    }