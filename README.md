# Lab 4

**Author:** Mari Ozuna Garcia (mozun002)

---

## Part 1 - NYT Most Popular Articles

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

## Part 2 - Tic Tac Toe (React)

A Tic Tac Toe game built with React + Vite.

### Setup

```bash
cd Part2
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Features

- X always goes first
- Tracks score for X and O across games
- Detects winner (and ties) and displays the result
- New Game button resets the board but keeps the score
- Extra credit: React Router with an About page (`/about`)

### Files

- **src/Board.jsx** — main game component with all the logic
- **src/About.jsx** — about page (extra credit)
- **src/App.jsx** — sets up routing between the game and about page
- **src/App.css** — styles for the board, nav, etc.
