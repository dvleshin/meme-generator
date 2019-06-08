function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function toggleMenu() {
    var navToggle = document.querySelector('nav');

    if (navToggle.style.display === '' || navToggle.style.display === 'none') {
        navToggle.style.display = 'block';
        document.querySelector('.menu-btn').innerHTML = '❌';
    } else {
        navToggle.style.display = ''
        document.querySelector('.menu-btn').innerHTML = '☰'
    }
}