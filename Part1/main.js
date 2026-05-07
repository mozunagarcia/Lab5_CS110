// builds the url depending on what the user picked
// shared ones are a little different bc of the facebook endpoint
function buildURL(sortBy, period) {
  const base = 'https://api.nytimes.com/svc/mostpopular/v2';
    if (sortBy === 'shared') {
        return `${base}/shared/${period}/facebook.json?api-key=${API_KEY}`;
    }
    return `${base}/${sortBy}/${period}.json?api-key=${API_KEY}`;
}

// hits the NYT api and grabs the articles list
async function fetchArticles(sortBy, period) {
    const url = buildURL(sortBy, period)
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

// makes one article card - if there's no image it'll just throw
// and loadArticles will skip it
function createArticleCard(article, index) {
    const imageUrl = article.media[0]['media-metadata'][1].url;

    const card = document.createElement('div');
    card.className = 'article-card'

    card.innerHTML = `
        <div class="article-header">
            <span class="article-title">${index}) ${article.title}</span>
            <span class="article-date">${article.published_date}</span>
        </div>
        <div class="article-body">
            <img src="${imageUrl}" alt="${article.title}">
            <p class="article-abstract">${article.abstract}</p>
        </div>
    `;

    return card;
}

// main function - fetches articles and puts them on the page
// stops at 5, skips ones with missing images
async function loadArticles() {
    const sortBy = document.querySelector('input[name="sortBy"]:checked').value;
    const period = document.querySelector('input[name="period"]:checked').value;
    const container = document.getElementById('articles-container')

    container.innerHTML = '<p id="loading">Loading articles...</p>';

    try {
        const articles = await fetchArticles(sortBy, period);
        container.innerHTML = '';

        let displayed = 0;
        let i = 0;

        while (displayed < 5 && i < articles.length) {
          try {
                const card = createArticleCard(articles[i], displayed + 1);
                container.appendChild(card);
                displayed++;
            } catch(e) {
                // article was missing something, just skip it
            }
            i++;
        }

        if (displayed === 0) {
            container.innerHTML = '<p id="error-msg">No articles available. Try a different filter.</p>';
        }
    } catch(err) {
        console.log(err)
        container.innerHTML = '<p id="error-msg">Failed to load articles. Check your API key or network connection.</p>';
    }
}

// reload whenever the user changes a filter
document.querySelectorAll('input[name="sortBy"], input[name="period"]').forEach(radio => {
    radio.addEventListener('change', loadArticles);
});

loadArticles();
