let clientWidth = window.screen.width
let clientHeight = window.screen.height

const button = document.querySelector('.j-button-click');

button.addEventListener('click', () =>{
    window.alert('Ширина ' + clientWidth +' Высота ' + clientHeight);
});
