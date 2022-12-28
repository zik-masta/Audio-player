const player = document.querySelector('.player'),
	    playBtn = document.querySelector('.play'),
			wrapp = document.querySelector('.wrapper'),
			prevBtn = document.querySelector('.prev'),
			nextBtn = document.querySelector('.next'),
			audio = document.querySelector('.audio'),
			progressContainer = document.querySelector('.progress_container'), 
			progress = document.querySelector('.progress'),
			title = document.querySelector('.song'),
			cover = document.querySelector('.cover_img'),
			imgSrc = document.querySelector('.img_src')
			

			// Название песен
const songs = ['Nickelback - Edge Of A Revolution', 'Mr. Big - Undertow', 'kino-группа крови']

// Песня по умолчанию
let songIndex = 1

// Init load song
function loadSong(song){
	title.innerHTML = song
	audio.src = `audio/${song}.mp3`
	cover.src = `img/cover${songIndex + 1}.png`
}
loadSong(songs[songIndex])

//Play 

function playSong() {
	player.classList.add('play')
	cover.classList.add('active')
	imgSrc.src = 'Img/pause.svg'
	audio.play()
	preparation()
}

//Pause

function pauseSong() {
	player.classList.remove('play')
	cover.classList.remove('active')
	imgSrc.src = 'Img/play.svg'
	audio.pause()
}

playBtn.addEventListener('click', () => {
	
	const isPlaying = player.classList.contains('play');
	if (isPlaying) {
		pauseSong()

	} else {
		playSong()
	}
	
})

// Next song

function nextSong () {
	songIndex ++

	if (songIndex > songs.length - 1){
		songIndex = 0
	}


	loadSong(songs[songIndex])
	playSong()

}

nextBtn.addEventListener('click', nextSong)

// prev Song

function prevSong () {
	songIndex --

	if (songIndex < 0){
		songIndex = songs.length - 1
	}

	loadSong(songs[songIndex])
	playSong()	

}

prevBtn.addEventListener('click', prevSong)

// Progress bar

function updateProgress (e) {
	const {duration, currentTime} = e.srcElement
	const progressPercent = (currentTime / duration) * 100
	progress.style.width = `${progressPercent}%`


}
audio.addEventListener('timeupdate', updateProgress)

// Set progress

function setProgres (e) {
	const widthContainer = this.clientWidth
	const clickX = e.offsetX
	const durationTreck = audio.duration

	audio.currentTime = ( clickX / widthContainer) * durationTreck

}
progressContainer.addEventListener('click', setProgres)


// Эквалайзер
let context, analyser, source, array, logo;

logo = cover.style


function preparation(){
	context = new AudioContext();
	analyser = context.createAnalyser();
	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	loop();
}

function loop(){
	window.requestAnimationFrame(loop)
	array = new Uint8Array(analyser.frequencyBinCount)
	analyser.getByteFrequencyData(array);

	logo.minHeight = (array[40]+"px");
	logo.width = (array[40]+"px");
}









