'use strict';

function onInitMain() {
    let imgs = getImgs();
    renderGallery(imgs)
}


function renderGallery(imgs) {

    var strHtmls = imgs.map(img => {
        return `
            <meme>
            <a href="editor.html" onclick="imgPicked(${img.id})"><img src="${img.url}" class="meme-img"></a>
            </meme>
            `
    })
    document.querySelector('.memes-imgs').innerHTML = strHtmls.join('');
}

function imgPicked(id) {
    // console.log('img picked:', id);
    setMeme(id);
}

function onMemesFilter(value) {
    let imgs = getMemesFiltered(value);
    renderGallery(imgs)
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