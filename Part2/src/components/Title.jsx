const SORT_LABELS = { viewed: 'Most Viewed', shared: 'Most Shared', emailed: 'Most Emailed' };
const PERIOD_LABELS = { '1': 'Day', '7': 'Week', '30': 'Month' };

function Title({ sortBy, period }) {
  return <h1 className="main-title">{SORT_LABELS[sortBy]} - {PERIOD_LABELS[period]}</h1>;
}

export default Title;
