'use strict';

function onInitMain() {
    renderGallery()
}


function renderGallery() {
    let imgs = getImgs();

    var strHtmls = imgs.map(img => {
        return `
        <section class="cards">
            <article>
            <a href="editor.html" onclick="imgPicked(${img.id})"><img src="${img.url}" class="article-img"></a>
            </article>
        </section>  `
    })
    document.querySelector('.cards').innerHTML = strHtmls.join('');
}

function imgPicked(id) {
    // console.log('img picked:', id);
    setMeme(id);
}