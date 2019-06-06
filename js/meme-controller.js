'use strict';

function onInitMain() {
    renderGallery()
}


function renderGallery() {
    let imgs = getImgs();

    var strHtmls = imgs.map(img => {
        return `
        <div><a href="editor.html" onclick="imgPicked(${img.id})"><img src="${img.url}"></a></div>
        `
    })
    document.querySelector('.imgs-container').innerHTML = strHtmls.join('');
}

function imgPicked(id) {
    // console.log('img picked:', id);
    setMeme(id);
}