const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Route for fetching all news
app.get("/all-news", async (req, res) => {
  try {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;

    let url = `https://newsapi.org/v2/everything?q=&pageSize=${pageSize}&page=${page}&apiKey=${process.env.API_KEY}`;
    const response = await axios.get(url);

    if (response.data.totalResults > 0) {
      res.json({
        status: 200,
        success: true,
        message: "Successfully fetched the data",
        data: response.data,
      });
    } else {
      res.json({
        status: 200,
        success: true,
        message: "No more results to show",
      });
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Failed to fetch data from the API",
      error: error.message,
    });
  }
});

// Route for fetching top headlines
app.get("/top-headlines", async (req, res) => {
  try {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business";

    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
    const response = await axios.get(url);

    if (response.data.totalResults > 0) {
      res.json({
        status: 200,
        success: true,
        message: "Successfully fetched the data",
        data: response.data,
      });
    } else {
      res.json({
        status: 200,
        success: true,
        message: "No more results to show",
      });
    }
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Failed to fetch top headlines",
      error: error.message,
    });
  }
});

// Route for fetching headlines by country
app.get("/country/:iso", async (req, res) => {
  try {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    const country = req.params.iso;

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`;
    const response = await axios.get(url);

    if (response.data.totalResults > 0) {
      res.json({
        status: 200,
        success: true,
        message: "Successfully fetched the data",
        data: response.data,
      });
    } else {
      res.json({
        status: 200,
        success: true,
        message: "No more results to show",
      });
    }
  } catch (error) {
    console.error(`Error fetching news for country ${req.params.iso}:`, error);
    res.status(500).json({
      status: 500,
      success: false,
      message: `Failed to fetch news for country ${req.params.iso}`,
      error: error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
