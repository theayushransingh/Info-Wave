const API_KEY = '36d026ec6fdc4c9b80d2db0efbcf9eca';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.querySelector(".card-container")
    const newsCardTemp = document.getElementById('template-news-card');
    cardContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemp.content.cloneNode(true);
        fillData(cardClone, article);
        cardContainer.appendChild(cardClone);

    });
}

function fillData(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('.news-title');
    const newsSrc = cardClone.querySelector('#news-src');
    const newsDesc = cardClone.querySelector('#news-desc');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta"
    });
    newsSrc.innerHTML = `${article.source.name} . ${date}`
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "..blank")
    })
}

let currSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navitem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');

    currSelectedNav = navitem;
    currSelectedNav.classList.add('active');
}

const searchbtn = document.querySelector('.search-btn');
const searchText = document.querySelector('.news-input');

searchbtn.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    currSelectedNav.classList.remove('active');
    currSelectedNav = null;
})