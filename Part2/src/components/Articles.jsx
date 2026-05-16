import ArticleCard from './ArticleCard';

function Articles({ articles, loading, fetchError, currentPage, totalPages, setCurrentPage, pageOffset }) {
  if (loading) return <p className="status-msg">Loading articles...</p>;
  if (fetchError) return <p className="status-msg">Failed to load articles. Check your API key or network.</p>;
  if (articles.length === 0) return <p className="status-msg">No articles available. Try a different filter.</p>;

  return (
    <div className="articles-section">
      <div className="articles-grid">
        {articles.map((article, i) => (
          <ArticleCard
            key={article.id ?? i}
            article={article}
            index={pageOffset + i + 1}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn${currentPage === i + 1 ? ' active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Articles;
