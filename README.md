# COVID-19 Tracker

This is a simple COVID-19 tracker that retrieves data from the backend and displays it on the frontend.

## Getting Started

Follow the instructions below to set up and run the project.

---

## Running the Backend

1. Open a terminal and navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```
   - The server will run on **port 5000** by default.
   - The API endpoint for fetching COVID-19 data is:
     ```
     http://localhost:5000/api/covid
     ```

---

## Running the Frontend

1. Open a terminal and navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm start
   ```
   - The application will open in your browser automatically.
   - It should connect to the backend and fetch COVID-19 data.
   - If data is not displayed, ensure the backend is running.

---

## Technologies Used

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express
- **Data Handling:** Fetch API, Day.js

---

## Credits

Developed by **Lenny Thobejane**

