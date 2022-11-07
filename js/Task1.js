const button = document.querySelector('.j-button-click');

button.addEventListener('click', () => {
    const style = document.querySelector('.arrow');
    let switcher = function(element, class1, class2){
        element.classList.toggle(class1);
        element.classList.toggle(class2);
    }
    switcher(style, 'white', 'black');    
});

