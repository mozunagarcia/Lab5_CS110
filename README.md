# Lab 5 - React Componenets and Hooks

**Author:** Mari Ozuna Garcia (mozun002)

---

## NYT Most Popular Articles

Fetches articles from the NYT Most Popular API and displays the top 5 with filters.

### Setup

1. Grab a free API key from https://developer.nytimes.com/
2. Copy `Part1/config.example.js` to `Part1/config.js` and paste your key in
3. Open `Part1/index.html` in a browser

### Files

- **index.html** — page layout with filter panel and article list
- **style.css** — dark theme, stacks to single column below 900px
- **main.js** — calls the NYT API with fetch/async-await, renders articles, skips any missing images

### API Endpoints

- Most Viewed: `/mostpopular/v2/viewed/{period}.json`
- Most Shared: `/mostpopular/v2/shared/{period}/facebook.json`
- Most Emailed: `/mostpopular/v2/emailed/{period}.json`

Periods: `1` = last day, `7` = last week, `30` = last month

No external libraries — plain HTML, CSS, and JS.

---
