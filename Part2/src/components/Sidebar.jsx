import { useState } from 'react';

function Sidebar({ sortBy, setSortBy, period, setPeriod, numArticles, setNumArticles }) {
  const [inputVal, setInputVal] = useState(String(numArticles));

  const handleSearch = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val) || val < 1) return;
    if (val > 15) {
      alert('number is higher than 15');
      return;
    }
    setNumArticles(val);
  };

  return (
    <div className="sidebar">
      <div className="search-group">
        <input
          type="number"
          placeholder="Enter a value 1-15"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          min="1"
          max="15"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filter-group">
        <strong>Sort By:</strong>
        {[['viewed', 'Most Viewed'], ['shared', 'Most Shared'], ['emailed', 'Most Emailed']].map(([val, label]) => (
          <label key={val}>
            <input
              type="radio"
              name="sortBy"
              value={val}
              checked={sortBy === val}
              onChange={() => setSortBy(val)}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <strong>Time Frame:</strong>
        {[['1', 'Day'], ['7', 'Week'], ['30', 'Month']].map(([val, label]) => (
          <label key={val}>
            <input
              type="radio"
              name="period"
              value={val}
              checked={period === val}
              onChange={() => setPeriod(val)}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
