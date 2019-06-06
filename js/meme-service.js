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
        keywords: ['child', 'cunning'],
    }, {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['man', 'smart'],
    }, {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['man', 'funny'],
    }, {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['obama', 'man', 'laughs'],
    }, {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['men', 'kiss', 'funny'],
    }, {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['children', 'dance', 'fun'],
    }, {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['tramp', 'man', 'angry'],
    }, {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['child', 'black', 'surprised'],
    }, {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['dog', 'stretching', 'fun'],
    }, {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['man', 'cheers', 'dicaprio'],
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