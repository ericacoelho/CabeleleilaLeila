
const RedirecionarLogin = () => {
    window.location.replace("./login.html");
}

const splash = document.querySelector('.splash')

document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        splash.classList.add('displayNone')
    }, 2000);
})
