# Todo List App (EJS)

A simple Todo List application using EJS templates and Express. Data is stored in-memory in an array (no database).

Deploy Link= https://todoappejs.onrender.com

## Features
- Add, edit and delete todos
- Filter by priority (High, Medium, Low)
- Responsive UI
- Correct HTTP verbs (GET, POST, PUT, DELETE via method-override)

## Run locally
1. `git clone <repo-url>`
2. `npm install`
3. `npm start`
4. Open `http://localhost:3000`

## Deploy (Render)
1. Push your repo to GitHub
2. On Render.com create a **New Web Service** and connect your GitHub repo
3. Set **Build Command** to `npm install` and **Start Command** to `npm start`
4. Render will set the `PORT` env var automatically — the app uses `process.env.PORT`
5. After deploy, paste the deploy link here.

## Notes
- This app uses an in-memory array. Restarting the server clears all todos.
