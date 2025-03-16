const express = require("express");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const rawData = JSON.parse(fs.readFileSync("covid.json", "utf8"));

// Rename keys and aggregate totals, this is mostly for the display in frontend
const covidData = rawData.map((record) => ({
    date: record["Date"],
    confirmed: Number(record["Total Confirmed Cases"]) || 0,
    deaths: Number(record["Total Deaths"]) || 0,
    recovered: Number(record["Total Recovered"]) || 0,
    active: Number(record["Active Cases"]) || 0,
    dailyConfirmed: Number(record["Daily Confirmed Cases"]) || 0,
    dailyDeaths: Number(record["Daily  deaths"]) || 0,
}));

const totals = covidData.reduce(
    (acc, record) => {
        acc.confirmed += record.confirmed;
        acc.deaths += record.deaths;
        acc.recovered += record.recovered;
        acc.active += record.active;
        acc.dailyConfirmed += record.dailyConfirmed;
        acc.dailyDeaths += record.dailyDeaths;
        return acc;
    },
    { confirmed: 0, deaths: 0, recovered: 0, active: 0, dailyConfirmed: 0, dailyDeaths: 0 }
);

// API Routes
app.get("/api/covid", (req, res) => {
    res.json({
        totals,
        records: covidData,
    });
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
