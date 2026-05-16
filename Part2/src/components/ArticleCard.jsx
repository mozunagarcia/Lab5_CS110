function ArticleCard({ article, index }) {
  if (article.hasError) {
    return (
      <div className="article-card">
        <div className="article-header">
          <span className="article-title">{index} Article not available</span>
        </div>
        <div className="article-body">
          <div className="placeholder-img" />
          <p className="article-abstract article-error">This article could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="article-card">
      <div className="article-header">
        <span className="article-title">{index} {article.title}</span>
        <span className="article-date">{article.published_date}</span>
      </div>
      <div className="article-body">
        <img src={article.imageUrl} alt={article.title} />
        <p className="article-abstract">{article.abstract}</p>
      </div>
    </div>
  );
}

export default ArticleCard;
