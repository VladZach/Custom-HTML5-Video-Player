const video = document.querySelector('video')
const playButton = document.querySelector('[title="Toggle Play"]')
const progressBar = document.querySelector('.progress')
const skipButtons = document.querySelectorAll('.skip')
const audioRange = document.querySelector('[name="volume"]')
const playbackRate = document.querySelector('[name="playbackRate"]')
let previousTime = 0
let progressFilling = document.querySelector('.progress__filled')
let isPlaying = false
let isEnded = false
function togglePlaying (e) {
  isPlaying = !isPlaying
  if (isPlaying) {
    video.play()
    e.target.textContent = '❚❚'
    if (isEnded) {
      isEnded = false
    }
  }
  else {
    video.pause()
    e.target.textContent = '►'
  }
}
function updateProgressBar() {
  const compensation = video.currentTime - previousTime
  const pxPerSec = progressBar.scrollWidth / (video.duration - compensation)
  const currentFill = video.currentTime * pxPerSec
  progressFilling.style.width = `${currentFill}px` 
  previousTime = video.currentTime
}



function moveToTime(e) {
  const secPerPx = video.duration / progressBar.scrollWidth
  video.currentTime = secPerPx * e.offsetX
  previousTime = video.currentTime
}

function skipTime(e) {
  const time = +e.target.dataset.skip
  video.currentTime += time
  previousTime = video.currentTime
}

function changeVolume(e) {
  const volume = e.target.value
  video.volume = volume
}

function changePlaybackRate(e) {
  const rate = e.target.value
  video.playbackRate = rate
}

function endVideo (e) {
  playButton.textContent = '🔃'
  isPlaying = false
  isEnded = true
}


progressBar.addEventListener('click', moveToTime)
video.addEventListener('timeupdate', updateProgressBar)
playButton.addEventListener('click', togglePlaying)
skipButtons.forEach((element) => element.addEventListener('click', skipTime))
audioRange.addEventListener('input', changeVolume)
playbackRate.addEventListener('input', changePlaybackRate)
video.addEventListener('ended', endVideo)

/* for pre-loader
also need event on initial loading data

video.addEventListener('seeking', (e) => console.log(e))
video.addEventListener('seeked', (e) => console.log(e)) */