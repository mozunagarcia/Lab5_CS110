import { useState, useEffect } from 'react';
import Title from './components/Title';
import Sidebar from './components/Sidebar';
import Articles from './components/Articles';
import './App.css';

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

function buildURL(sortBy, period) {
  const base = 'https://api.nytimes.com/svc/mostpopular/v2';
  if (sortBy === 'shared') {
    return `${base}/shared/${period}/facebook.json?api-key=${API_KEY}`;
  }
  return `${base}/${sortBy}/${period}.json?api-key=${API_KEY}`;
}

function processArticle(article) {
  try {
    const imageUrl = article.media[0]['media-metadata'][1].url;
    return { ...article, imageUrl, hasError: false };
  } catch {
    return { ...article, imageUrl: null, hasError: true };
  }
}

const ARTICLES_PER_PAGE = 6;

function App() {
  const [sortBy, setSortBy] = useState('viewed');
  const [period, setPeriod] = useState('1');
  const [articles, setArticles] = useState([]);
  const [numArticles, setNumArticles] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      setFetchError(false);
      setCurrentPage(1);
      try {
        const response = await fetch(buildURL(sortBy, period));
        const data = await response.json();
        setArticles(data.results.slice(0, numArticles).map(processArticle));
      } catch (err) {
        console.error('Error fetching articles:', err);
        setFetchError(true);
        setArticles([]);
      }
      setLoading(false);
    };
    getArticles();
  }, [sortBy, period, numArticles]);

  const pageOffset = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(pageOffset, pageOffset + ARTICLES_PER_PAGE);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  return (
    <div className="app">
      <Title sortBy={sortBy} period={period} />
      <div className="main-layout">
        <Sidebar
          sortBy={sortBy} setSortBy={setSortBy}
          period={period} setPeriod={setPeriod}
          numArticles={numArticles} setNumArticles={setNumArticles}
        />
        <Articles
          articles={currentArticles}
          loading={loading}
          fetchError={fetchError}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          pageOffset={pageOffset}
        />
      </div>
    </div>
  );
}

export default App;
