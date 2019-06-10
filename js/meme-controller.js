'use strict';

function onInitMain() {
    let imgs = getImgs();
    renderGallery(imgs)
    createKeywordToCntMap();
    renderKeywordsValues();
}


function renderGallery(imgs) {

    var strHtmls = imgs.map(img => {
        return `
            <meme>
            <a href="editor.html" onclick="imgPicked(${img.id})"><img src="${img.url}" onmouseover="onImgHovered(this)" class="meme-img"></a>
            </meme>
            `
    })
    document.querySelector('.memes-imgs').innerHTML = strHtmls.join('');
}

function imgPicked(id) {
    // console.log('img picked:', id);
    setMeme(id);
}

function onImgHovered(elImg) {
    elImg.classList.add('shake');
    console.log('img hovered');

}

function onMemesFilter(value) {
    let imgs = getMemesFiltered(value);
    renderGallery(imgs)
    renderKeywordsValues();
}

function renderKeywordsValues() {
    const mostSearchedKeywords = getMostSearchedKeywords(5);

    let elKeywords = document.querySelectorAll('.keywords-container span');

    elKeywords.forEach(function (el, idx) {
        el.innerText = mostSearchedKeywords[idx];
    });
}