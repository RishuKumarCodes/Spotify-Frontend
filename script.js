$(document).ready(function () {
    // Click handler for main dropdown items
    $(".nav-btn li").click(function (e) {
        // Toggle the active class on the clicked item
        $(this).toggleClass("active");

        // Remove the active class from sibling items
        $(this).siblings().removeClass("active");

        // If the clicked item has a submenu, toggle its visibility
        $(this).find("ul").slideToggle();

        // Prevent event propagation to avoid immediate collapsing
        e.stopPropagation();
    });

    // Click handler for submenu items to prevent propagation
    $(".lib .sub-menu li").click(function (e) {
        // Prevent event propagation to parent elements
        e.stopPropagation();
    });

    $(".icon").click(function () {
        var img = $(this).find("img");
        var src = img.attr("src");

        if ($(this).closest("li").hasClass("active")) {
            img.attr("src", src.replace("Filled=No", "Filled=Yes"));
        } else {
            img.attr("src", src.replace("Filled=Yes", "Filled=No"));
        }
    });

    $(".li-icon").click(function () {
        var img = $(this).find("img");
        var src = img.attr("src");

        if ($(this).closest("li").hasClass("active")) {
            img.attr("src", src.replace("Filled=No", "Filled=Yes"));
        } else {
            img.attr("src", src.replace("Filled=Yes", "Filled=No"));
        }
    });
});
// _______________________Toggle theme_____________________________


var theme = document.getElementById("theme");
var icon = document.getElementById("theme-img")
theme.onclick = function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "icons/light.svg"
    } else {
        icon.src = "icons/dark.svg"
    }
}

// hamburger
var ham = document.getElementById("hamburger");
var sidebar = document.getElementsByClassName("sidebar")[0];

ham.onclick = function () {
    if (sidebar.style.display === "none") {
        sidebar.style.display = "block";
    } else {
        sidebar.style.display = "none";
    }
}

// _____________________________________________________________
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5501/library/");
    let response = await a.text();
    let element = document.createElement("div");
    element.innerHTML = response;
    let as = element.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/library/")[1]);
        }
    }
    return songs;
}

async function main() {
    // get the list of all the songs.
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".pins").getElementsByTagName("li")[0]
    for (const song of songs) {
        songUL.innerHTML += `
                            <a href="#">
                                <img src="icons/Play Simple, Filled=No.svg" alt="">
                                <div>
                                    <b>${song.replaceAll("%20", " ")}</b>
                                    <p>Artist name</p>
                                </div>
                            </a>`
    }

}

// Attach an event listener to each song:

main();

// ____________ left sidebar -> library -> dropdown menu_________
/* 

CHAT GPT ANSWER -->


document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById('audio-player');
    const currTimeElem = document.querySelector('.curr-time');
    const totTimeElem = document.querySelector('.tot-time');
    const progressBar = document.querySelector('.progress-bar');

    // Format time in MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Update total time when metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', () => {
        totTimeElem.textContent = formatTime(audioPlayer.duration);
        progressBar.max = Math.floor(audioPlayer.duration);
    });

    // Update current time and progress bar as the audio plays
    audioPlayer.addEventListener('timeupdate', () => {
        currTimeElem.textContent = formatTime(audioPlayer.currentTime);
        progressBar.value = Math.floor(audioPlayer.currentTime);
    });

    // Seek to new time when progress bar is adjusted
    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });

    // Optional: Play audio on page load (you might want to remove this for user experience)
    // audioPlayer.play();
});
*/