'use strict';
const KEY = 'userMeme'
let gKeywords;
let gMeme;

let gImgs = [{
        id: 1,
        url: 'img/1.jpg',
        keywords: ['woman', 'happy', 'nature'],
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['man', 'trump', 'angry'],
    }, {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['animals', 'puppies', 'love'],
    }
];

function getImgs() {
    return gImgs;
}

function setMeme(id) {
    gMeme = {
        selectedImgId: id,
        txts: [{
            line: '',
            size: 50,
            align: '',
            color: ''
        }]
    }
    saveToStorage(KEY, gMeme);
}


function getMemeImgById(id) {
    let meme = gImgs.find(meme => {
        return id === meme.id
    })
    return meme;
}