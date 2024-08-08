const progress = document.getElementById("progress");
const song = document.getElementById("song");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const songImg = document.querySelector(".music-player img");
const artistName = document.querySelector(".music-player p");
const searchBar = document.getElementById("search-bar");
const playlist = document.getElementById("playlist");

const songs = [
  {
    title: "Deshi Balak",
    name: "Hariyana Hood",
    source: "song-list/harya.mp3",
    sour: "images/img-1.jfif",
  },
  {
    title: "Roja Janeman",
    name: "OLd Is Gold",
    source: "song-list/roja.mp3",
    sour: "images/img-2.jfif",
  },
  {
    title: "Tere Hawaale",
    name: "Lal Singh Chaddha",
    source: "song-list/lal.mp3",
    sour: "images/img-3.jfif",
  },
  {
    title: "ho gai ladai maari",
    name: "Manan Bhardwaj, Bhupinder Babbal",
    source: "song-list/ladai.mp3",
    sour: "images/img-4.jpg",
  },
  {
    title: "Sanam Re",
    name: "Ajeet Singh",
    source: "song-list/Sanamre.mp3",
    sour: "images/img-5.jpg",
  },
  {
    title: "Mareez - E - Ishq",
    name: "Zid",
    source: "song-list/zid.mp3",
    sour: "images/img-6.jpg",
  },
  {
    title: "Tum Mera Ho",
    name: "Hate Story-4",
    source: "song-list/hate.mp3",
    sour: "images/img-7.jfif",
  },
];

let currentSongIndex = 0;

function updateSongInfo() {
  songImg.src = songs[currentSongIndex].sour;
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
}

song.addEventListener("timeupdate", () => {
  progress.value = song.currentTime;
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  song.paused ? playSong() : pauseSong();
}

playPauseButton.addEventListener("click", playPause);
progress.addEventListener("input", () => (song.currentTime = progress.value));
progress.addEventListener("change", playSong);

forwardButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

backwardButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

function filterSongs(query) {
  return songs.filter((song) =>
    song.title.toLowerCase().includes(query) ||
    song.name.toLowerCase().includes(query)
  );
}

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filteredSongs = filterSongs(query);
  displayPlaylist(filteredSongs);
});




function displayPlaylist(songs) {
  playlist.innerHTML = "";
  
  if (songs.length === 0) {
    playlist.innerHTML = "<li>No results found</li>";
  } else {
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = `${song.title} - ${song.name}`;
      li.addEventListener("click", () => {
        currentSongIndex = index;
        updateSongInfo();
        playPause();
      });
      playlist.appendChild(li);
    });
  }
}

displayPlaylist(songs);
updateSongInfo();



// <!-- ////// -->