function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function openContact() {
    document.querySelector('.email').classList.remove('fadeOutDown')
    document.querySelector('.email').classList.remove('hide')
    document.querySelector('.email').classList.add('fadeInUp')
}

function closeContact() {
    document.querySelector('.email').classList.remove('fadeInUp')
    document.querySelector('.email').classList.add('fadeOutDown')
}

function sendEmail() {
    var userFormSubject = document.getElementById('user-form-subject').value
    var userFormMessage = document.getElementById('user-form-message').value
    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=support@domain.com&su=${userFormSubject}&body=${userFormMessage}`;

    var win = window.open(url, '_blank');
    win.focus();

    document.getElementById('user-form-email').value = '';
    document.getElementById('user-form-subject').value = '';
    document.getElementById('user-form-message').value = '';

}

function openAboutModal() {
    document.querySelector('.modal').style.display = 'block';
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}