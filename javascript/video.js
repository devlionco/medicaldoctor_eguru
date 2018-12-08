var currentVideo = null;

function toggleVideo(video) {
    if ($(video).length > 0) {
        var videoPlayer = video[0];

        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
}

function stopVideo(video) {
    if ($(video).length > 0) {
        var videoPlayer = video[0];

        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
}

function playVideo(video) {
    if ($(video).length > 0) {
        var videoPlayer = video[0];

        videoPlayer.play();
    }
}

function pauseVideo(video) {
    if ($(video).length > 0) {
        var videoPlayer = video[0];

        videoPlayer.pause();
    }
}

function volumeVideo(video, direction) {
    if ($(video).length > 0) {
        var videoPlayer = video[0];

        switch (direction) {
            case 0:
                videoPlayer.volume -= (videoPlayer.volume == 0 ? 0 : 0.1);
                break;
            case 1:
                videoPlayer.volume += videoPlayer.volume == 1 ? 0 : 0.1;
                break;
        }
    }
}

function muteVideo(video) {
    if ($(video).length > 0) {
        var videoPlayer = video[0];

        if (videoPlayer.muted) {
            videoPlayer.muted = false;
        }
        else {
            videoPlayer.muted = true;
        }
    }
}

function replayVideo(video) {
    if ($(video).length > 0) {
        var videoPlayer = video[0];

        stopVideo(video);
        videoPlayer.play();
    }
}

function maximizeVideo(video) {
    if ($(video).length > 0) {
        var videoPlayer = video[0];


        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.mozRequestFullScreen) {
            videoPlayer.mozRequestFullScreen();
        } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
        }
    }
}

$(function () {
    $(".video").on("contextmenu", function (e) {
        e.preventDefault();
    });

    $(".video .video-overlay").on("click", function (e) {
        e.preventDefault();

        toggleVideo($(this).next('video'));
    });

    $(".video .video-controls .play-button").on("click", function (e) {
        e.preventDefault();

        toggleVideo($(this).closest('.video').find('video'));
    });

    $(".video .video-controls .stop-button").on("click", function (e) {
        e.preventDefault();

        stopVideo($(this).closest('.video').find('video'));
    });

    $(".video .video-controls .volume-dec-button").on("click", function (e) {
        e.preventDefault();

        volumeVideo($(this).closest('.video').find('video'), 0);
    });

    $(".video .video-controls .volume-inc-button").on("click", function (e) {
        e.preventDefault();

        volumeVideo($(this).closest('.video').find('video'), 1);
    });

    $(".video .video-controls .mute-button").on("click", function (e) {
        e.preventDefault();

        muteVideo($(this).closest('.video').find('video'));
    });

    $(".video .video-controls .replay-button").on("click", function (e) {
        e.preventDefault();

        replayVideo($(this).closest('.video').find('video'));
    });

    $(".video .video-controls .progress-bar").on("click", function (e) {
        var progressBar = $(this)[0];
        var videoPlayer = $(this).closest('.video').find('video')[0];

        var x = e.pageX - progressBar.offsetLeft, // or e.offsetX (less support, though)
            y = e.pageY - progressBar.offsetTop,  // or e.offsetY
            clickedValue = x * progressBar.max / progressBar.offsetWidth;

        videoPlayer.currentTime = clickedValue * videoPlayer.duration / 100;
        progressBar.value = clickedValue;
    });

    $(".video .video-controls .fullscreen-button").on("click", function (e) {
        maximizeVideo($(this).closest('.video').find('video'));
    });

    $(".video video").on('play', function (e) {
        $(this).prev('.video-overlay').css('opacity', '0');
        $(this).closest('.video').find('.video-controls .play-button i').removeClass('fa-play').addClass('fa-pause');

        currentVideo = $(this);
    });

    $(".video video").on('pause', function (e) {
        $(this).prev('.video-overlay').css('opacity', '1');
        $(this).closest('.video').find('.video-controls .play-button i').removeClass('fa-pause').addClass('fa-play');
    });

    $(".video video").on('timeupdate', function (e) {
        var progressBarElement = $(this).closest('.video').find('.video-controls .progress-bar');
        var videoPlayer = this;

        if ($(progressBarElement).length > 0) {
            var progressBar = progressBarElement[0];
            var percentage = videoPlayer.currentTime * 100 / videoPlayer.duration;

            progressBar.value = percentage;
        }
    });

    $('body').on('keyup', function (e) {
        if (e.keyCode == 32) {
            if (currentVideo) {
                e.preventDefault();

                toggleVideo($(currentVideo));

                $('html, body').animate({
                    scrollTop: $(currentVideo).offset().top - 300
                }, 5);
            }
        }
    });
});
