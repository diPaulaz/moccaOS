const iconData = [
    {type: 'audio', title: 'saudades.mp3', icon: 'icons/audio.png', content: '<div class="win98-audio"><audio controls autoplay><source src="media/audio/saudades.mp3" type="audio/mpeg"></audio></div>'},
    {type: 'image', title: 'totoro.png', icon: 'icons/image.png', content: '<img src="media/image/totoro.png" alt="Random Image">'},
    {type: 'video', title: 'wonders.mp4', icon: 'icons/video.png', content: '<video width="fit-content" height="fit-content" controls autoplay><source src="media/video/wonders.mp4" type="video/mp4"></video>'},
    //{type: 'text', title: 'oi.txt', icon: 'icons/text.png', content: '<div style="white-space: pre-wrap;">Oi!</div>'},
];

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
    document.getElementById('clock').textContent = time;
}

setInterval(updateClock, 1000);
updateClock();

let windowIndex = 0;

function createIcons() {
    const desktop = document.getElementById('desktop');
    desktop.innerHTML = '';
    const margin = 100;
    iconData.forEach((icon, index) => {
        const iconElement = document.createElement('div');
        iconElement.className = 'icon';
        iconElement.innerHTML = `
            <img src="${icon.icon}" alt="${icon.title} Icon">
            <span class="icon-text">${icon.title}</span>
        `;
        iconElement.style.top = `${margin + Math.random() * (desktop.clientHeight - 2*margin)}px`;
        iconElement.style.left = `${margin + Math.random() * (desktop.clientWidth - 2*margin)}px`;
        iconElement.ondblclick = () => openMedia(icon.type, icon.title, icon.content);
        desktop.appendChild(iconElement);
        makeDraggable(iconElement);
    });
}

function openMedia(type, title, content) {
    windowIndex++;
    const mediaWindow = document.createElement('div');
    mediaWindow.className = 'media-window';
    mediaWindow.style.top = `${Math.max(50, Math.random() * (window.innerHeight - 300))}px`;
    mediaWindow.style.left = `${Math.max(50, Math.random() * (window.innerWidth - 400))}px`;
    mediaWindow.style.zIndex = windowIndex;
    mediaWindow.innerHTML = `
        <div class="title-bar">
            <div class="title-bar-text">${title}</div>
            <div class="title-bar-controls">
                <button onclick="closeMediaWindow(this.closest('.media-window'))">X</button>
            </div>
        </div>
        <div class="media-content">${content}</div>
    `;
    document.body.appendChild(mediaWindow);
    makeDraggable(mediaWindow);
    mediaWindow.addEventListener('mousedown', bringToFront);
}

function closeMediaWindow(window) {
    window.remove();
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.firstElementChild.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function bringToFront() {
    windowIndex++;
    this.style.zIndex = windowIndex;
}

createIcons();

window.addEventListener('resize', createIcons);

const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');

startButton.addEventListener('click', toggleStartMenu);

function toggleStartMenu() {
    if (startMenu.style.display === 'block') {
        startMenu.style.display = 'none';
    } else {
        startMenu.style.display = 'block';
    }
}

document.addEventListener('click', function(event) {
    if (!startButton.contains(event.target) && !startMenu.contains(event.target)) {
        startMenu.style.display = 'none';
    }
});