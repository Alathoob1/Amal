# Amal Autism Platform (أمل)

This project requires a backend to be running for authentication, data fetching, and more. All data is served live from the local `database.sqlite` database using the `server.js` Express API endpoints.

## How to run the project

1. Open the project in VS Code (or your preferred IDE)
2. Run `npm install` if needed (to install the required dependencies: express, sqlite, sqlite3, bcryptjs)
3. Run `npm start` (this executes `node server.js`)
4. Open your web browser and go to [http://localhost:3000/login](http://localhost:3000/login)

**Important Constraints:**
- Do not open the HTML files directly (e.g. by double-clicking them, which uses `file:///`). A protective script has been added to show an error message if this is done, because the app needs the API backend to function.
- The platform uses a real backend. Do not delete the API endpoints or use hardcoded data.
- The `database.sqlite` file holds live user data and must not be deleted.
