window.addEventListener('load', () => {
    const music = document.getElementById('pp');
    const audio = document.querySelector('audio');

    audio.loop = true;

    if (window.localStorage.getItem('music') === 'off') {
        music.style.setProperty('--text', "'OFF'");
        audio.pause();
    } else {
        music.style.setProperty('--text', "'ON'");
        audio.play();
    }
});

const music = document.getElementById('pp');
const audio = document.querySelector('audio');

music.addEventListener('click', () => {
    if (music.style.getPropertyValue('--text') === "'ON'") {
        music.style.setProperty('--text', "'OFF'");
        audio.pause();
        window.localStorage.setItem('music', 'off');
    } else {
        music.style.setProperty('--text', "'ON'");
        audio.play();
        window.localStorage.setItem('music', 'on');
    }
});

const secretInput = document.getElementById("secret");
const secretcheck = document.getElementById("check-secret");

secretcheck.addEventListener("click", () => {
    if(secretInput.value == "Danse enchantée des noix"){
        console.log("gg");
        window.location.href = "assets/data/world.zip";
    }
})