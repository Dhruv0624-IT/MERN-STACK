# Movie-Project — CRUD with image upload

This project already contains working CRUD endpoints for movies and includes image upload support using `multer`.

Server defaults:
- Base API: `http://localhost:5000/api/movies`
- Uploads served from: `http://localhost:5000/uploads/<filename>`

Available endpoints (important ones):

- POST /api/movies/single
  - form-data fields: `title` (required), `description`, `releaseDate` (YYYY-MM-DD), `poster` (file)
  - returns created movie JSON

- POST /api/movies/multiple
  - form-data fields: `movies` (JSON array of movie objects), `posters` (array of files, max 10)

- GET /api/movies
  - returns all movies

- GET /api/movies/:id
  - returns single movie

- PUT /api/movies/:id
  - form-data fields: `title`, `description`, `releaseDate`, `poster` (file)
  - updates movie (if poster provided, replaces stored filename)

- DELETE /api/movies/:id
  - deletes movie and associated poster file (if present)

Quick cURL examples (Windows PowerShell):

Create a movie with poster:

```powershell
curl -v -X POST "http://localhost:5000/api/movies/single" -F "title=My Movie" -F "description=Test" -F "releaseDate=2025-10-21" -F "poster=@C:\path\to\poster.jpg"
```

Update a movie's poster:

```powershell
curl -v -X PUT "http://localhost:5000/api/movies/<MOVIE_ID>" -F "title=Updated Title" -F "poster=@C:\path\to\newposter.png"
```

Get all movies:

```powershell
curl "http://localhost:5000/api/movies"
```

Notes & troubleshooting:
- Make sure `.env` contains a working `MONGO_URI` (the project already has a `.env` pointing to `mongodb://127.0.0.1:27017/moviesDB`).
- The server statically serves `uploads/` so the `poster` field in the DB stores relative `uploads/<filename>`; you can open that URL in the browser.
- Multer file size limit is 10MB and only JPG/PNG are allowed.

Local quick test:
1. Start MongoDB locally (if not running).
2. Start server: `npm run start` (or `npm run dev` to run without nodemon).
3. Open `test-upload.html` in a browser and use the forms to create/update movies.

If you'd like, I can:
- Add a small frontend React page to integrate uploads.
- Add automated tests for endpoints.
- Return full absolute URL for poster field when returning movie JSON.

Frontend (optional)
-------------------
I added a minimal Vite + React frontend in `frontend-react/` that lists movies and allows creating/updating/deleting movies with poster uploads.

To run the frontend:

1. cd into the frontend folder and install dependencies:

```powershell
cd frontend-react
npm install
npm run dev
```

2. The frontend expects the API at `http://localhost:5000/api/movies` by default. To change the API base, set the environment variable `VITE_API_BASE` when starting Vite, for example:

```powershell
set VITE_API_BASE=http://localhost:5000/api/movies; npm run dev
```

The page will show movie cards and let you upload posters directly from the browser.

