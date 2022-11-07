const wsUri = "wss://echo-ws-service.herokuapp.com";
const messageInput = document.querySelector('.message');
const sendBtn = document.querySelector('.j-btn-message');
const textWindow = document.querySelector('.message-window');
const geoBtn = document.querySelector('.j-btn-geo');
let websocket = new WebSocket(wsUri); 

websocket.onopen = function() {
    console.log("CONNECTED");
};

websocket.onerror = function(evt) {
    console.log(evt.data)
};

websocket.onmessage = function(evt) {
  addMessage(evt.data, 'answer');
};

function sendMessage() {
    let message = messageInput.value;
    websocket.send(message);
    addMessage(message);
    messageInput.value = ''
};

sendBtn.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
 }});
 
 sendBtn.addEventListener("click", () => {
    sendMessage();
 });

function addMessage(message, secondClass='question') {
    let element = `<p class='message-body ${secondClass}'> ${message}</p>`;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
    textWindow.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
}

const error = () => {
    let error = "Позиция не может быть определена" 
    addMessage(error);
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    let elementLink = `<a target="_blank" href="${link}">Гео-позиция</a>`;
    addMessage(elementLink)
}

function addLink(link) {
    let element = `
    <a  href='${link}'
        target='_blank'
        style='text-decoration: none;'
        >
        Гео-позиция
        </a>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
    
    textWindow.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
};

geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log("You can't use geolocation")
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    };
});
