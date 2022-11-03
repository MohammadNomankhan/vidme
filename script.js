const video = document.querySelector('video')
const progressRange = document.querySelector('.progress__range');
const progressBar = document.querySelector('.progress__bar');
const playBtn = document.getElementById('play-btn'); 
const volumneIcon = document.getElementById('volume-icon'); 
const volumneRange = document.getElementById('volume-range'); 
const volumneBar = document.getElementById('volume-bar'); 
const fullScreen = document.querySelector('.fullscreen');
const timeElapsed = document.querySelector('.time-elapsed'); 
const timeDuration = document.querySelector('.time-duration'); 
const speed = document.querySelector('.player-speed');
const player = document.querySelector('.player');
const fullScreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
function showPlayIcon() {
	playBtn.classList.replace('fa-pause','fa-play');
	playBtn.setAttribute('title', 'Play');
}
function togglePlay() {
	if (video.paused) {
		video.play();
		playBtn.classList.replace('fa-play','fa-pause');
		playBtn.setAttribute('title', 'Pause');
	} else {
		video.pause();
		showPlayIcon();
	}
}
// event listeners - move to end when project done
video.addEventListener('ended', showPlayIcon);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// Progress Bar ---------------------------------- //
function displayTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);
	seconds > 9 ? seconds : `0${seconds}`;
	return `${minutes}:${seconds}`;

}
function updateProgress() {
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
	timeElapsed.textContent = `${displayTime(video.currentTime)} /`;
	timeDuration.textContent = `${displayTime(video.duration)}`
}
function setprogress(e) {
	const newTime = e.offsetX / progressRange.offsetWidth;
	progressBar.style.width = `${newTime * 100}%`;
	video.currentTime = newTime * video.duration;
}

// event listeners - move to end when project done
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setprogress);

// Volume Controls --------------------------- //

let lastVolume = 1;

function changeVolume(e) {
	const newVolume = e.offsetX / volumneRange.offsetWidth;
	if (newVolume < 0.1){
		newVolume = 0;
	} if (newVolume > 0.9) {
		newVolume = 1;
	}
	volumneBar.style.width = `${newVolume * 100}%`;
	video.volume = newVolume;
	// change vol icon
	volumneIcon.className = '';
	if (newVolume > 0.7) {
		volumneIcon.classList.add('fas','fa-volume-up');
	} else if(newVolume < 0.7 && newVolume > 0){
		volumneIcon.classList.add('fas','fa-volume-down');
	} else if (newVolume === 0) {
		volumneIcon.classList.add('fas','fa-volume-off');
	}
	lastVolume = newVolume;
}
// mute and unmute
function toggleMute() {
	volumeIcon.className = '';
	if (video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumneIcon.classList.add('fas','fa-volume-off');
		volumneBar.style.width = 0;
	} else {
		video.volume = lastVolume;
		volumneIcon.classList.add('fas','fa-volume-off');
		volumneBar.style.width = `${lastVolume * 100}%`;
	}
}

// event listeners - move to end when project done
volumneRange.addEventListener('click', changeVolume);
volumneIcon.addEventListener('click', toggleMute);
// Change Playback Speed -------------------- //
function changeSpeed(){
	video.playbackRate = speed.value;
}

// event listeners - move to end when project done
speed.addEventListener('change', changeSpeed);
// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen(elem) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let ifFullScreen = false;
function toggleScreen() {
	if(!ifFullScreen) {
		openFullscreen(player);
	} else {
		closeFullscreen(player);
	}
	ifFullScreen = !ifFullScreen;
}

fullScreenBtn.addEventListener('click', toggleScreen);