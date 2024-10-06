# 📊 Candlestick Data Aggregation

This project demonstrates how to aggregate lower timeframe candlestick data (e.g., 1m, 5m) into higher timeframes (e.g., 15m, 1h) using JavaScript. It also visualizes the aggregated data on a candlestick chart using the LightweightCharts library, along with corresponding volume data.

---

## 🚀 Features

- **Timeframe Aggregation**: Combine lower timeframe candlestick data to create higher timeframe candles.
- **Candlestick Chart**: Visualize the aggregated data with real-time updates.
- **Volume Histogram**: Display the trading volume with color-coded bars (green for price increase, red for decrease).
- **Interactive Timeframe Selector**: Select different timeframes dynamically.

---

## 🛠️ Usage

1. Open the file `index.html` with Live Server or any local server.
2. Select different timeframes using the dropdown menu to dynamically update the chart.

   Example of the dropdown structure:

   - 1m
   - 5m
   - 10m
   - 15m
   - 1h

3. The chart and volume data will update based on the selected timeframe.

---

## 📂 File Structure

├── index.html # Main HTML file to display the chart  
├── main.js # JavaScript file that handles chart logic  
├── data.csv # CSV file containing candlestick data  
├── README.md # Project documentation

---

## 📊 How It Works

1. **Fetch CSV Data**: The project loads candlestick data from a local data.csv file and parses it into a format usable by the chart.
2. **Timeframe Conversion**: The convertTimeframe function takes the lower timeframe candles and combines them into a higher timeframe (like 5m or 15m).

3. **Charting**: Using the LightweightCharts library, it visualizes both the candlestick data and volume in separate series:
   - Candlestick series for price data (open, high, low, close).
   - Volume series for trade volume data with color-coded bars.

---

## 🔔 Stay Updated!

If you enjoyed this project and want to see more or similar projects, follow me for updates! 🚀  
You can also follow me on **YouTube** for more awesome content:  
👉 [YouTube Channel](https://www.youtube.com/@karthik947/videos)

Stay tuned! 🎥✨
