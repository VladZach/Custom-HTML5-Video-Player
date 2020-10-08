const video = document.querySelector('video')
const playButton = document.querySelector('[title="Toggle Play"]')
const progressBar = document.querySelector('.progress')
const skipButtons = document.querySelectorAll('.skip')
const audioRange = document.querySelector('[name="volume"]')
const playbackRate = document.querySelector('[name="playbackRate"]')
const veil = document.querySelector('.veil')
const playerIcon = document.querySelector('.player__icon')
const progressFilling = document.querySelector('.progress__filled')

let previousTime = 0
let isPlaying = false
let isEnded = false

function togglePlaying () {
  isPlaying = !isPlaying
  if (isPlaying) {
    video.play()
    playButton.textContent = '❚❚'
    if (isEnded) {
      isEnded = false
      veil.style.opacity = 0
    }
  }
  else {
    video.pause()
    playButton.textContent = '►'
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
  veil.style.opacity = .3
  playButton.textContent = '🔃'
  isPlaying = false
  isEnded = true
}

function startLoad() {
  veil.style.opacity = .3
}

function endLoad() {
  veil.style.opacity = 0
}

progressBar.addEventListener('click', moveToTime)
veil.addEventListener('click', togglePlaying)
playButton.addEventListener('click', togglePlaying)
skipButtons.forEach((element) => element.addEventListener('click', skipTime))
audioRange.addEventListener('input', changeVolume)
playbackRate.addEventListener('input', changePlaybackRate)
video.addEventListener('ended', endVideo)
video.addEventListener('seeking', startLoad)
video.addEventListener('seeked', endLoad) 
video.addEventListener('timeupdate', updateProgressBar)