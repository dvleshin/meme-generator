'use strict';

function onInitMain() {
    let imgs = getImgs();
    renderGallery(imgs)
}


function renderGallery(imgs) {


    var strHtmls = imgs.map(img => {
        return `
            <article>
            <a href="editor.html" onclick="imgPicked(${img.id})"><img src="${img.url}" class="article-img"></a>
            </article>
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