const getData = async () => {
  const res = await fetch("data.csv");
  const resp = await res.text();
  //   console.log(resp);
  const cdata = resp.split("\n").map((row) => {
    const [time1, time2, open, high, low, close, volume] = row.split(",");
    return {
      time: new Date(`${time1}, ${time2}`).getTime() / 1000,
      open: open * 1,
      high: high * 1,
      low: low * 1,
      close: close * 1,
      volume: volume * 1,
    };
  });
  return cdata;
};

const tfw = {
  "1m": 1 * 60,
  "2m": 2 * 60,
  "3m": 3 * 60,
  "5m": 5 * 60,
  "10m": 10 * 60,
  "15m": 15 * 60,
  "30m": 30 * 60,
  "1h": 1 * 60 * 60,
  "2h": 2 * 60 * 60,
  "4h": 4 * 60 * 60,
};

const getNormalizedTimeframe = (ts, timeframe) =>
  ~~(ts / tfw[timeframe]) * tfw[timeframe];

const convertTimeframe = (candles, targetTimeframe) => {
  let result = [];
  let currentKline = {};
  for (let i = 0; i < candles.length; i++) {
    if (i === 0) {
      currentKline.time = getNormalizedTimeframe(
        candles[i].time,
        targetTimeframe
      );
      currentKline.open = candles[i].open;
      currentKline.high = candles[i].high;
      currentKline.low = candles[i].low;
      currentKline.close = candles[i].close;
      currentKline.volume = candles[i].volume;
      continue;
    }

    if (candles[i].time < currentKline?.time + tfw[targetTimeframe]) {
      currentKline.high = Math.max(currentKline.high, candles[i].high);
      currentKline.low = Math.min(currentKline.low, candles[i].low);
      currentKline.close = candles[i].close;
      currentKline.volume += candles[i].volume;
      continue;
    }

    if (candles[i].time >= currentKline?.time + tfw[targetTimeframe]) {
      result.push({ ...currentKline });
      currentKline.time = getNormalizedTimeframe(
        candles[i].time,
        targetTimeframe
      );
      currentKline.open = candles[i].open;
      currentKline.high = candles[i].high;
      currentKline.low = candles[i].low;
      currentKline.close = candles[i].close;
      currentKline.volume = candles[i].volume;
      continue;
    }
  }

  return result;
};

const displayChart = async (targetTimeframe = "5m") => {
  const chartProperties = {
    width: 1500,
    height: 600,
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
  };

  const domElement = document.getElementById("tvchart");
  domElement.innerHTML = "";
  const chart = LightweightCharts.createChart(domElement, chartProperties);
  const klinedata = await getData();
  const convertedKlines = convertTimeframe(klinedata, targetTimeframe);

  // KLINE SERIES
  const candleseries = chart.addCandlestickSeries();
  candleseries.priceScale().applyOptions({
    scaleMargins: {
      top: 0.1,
      bottom: 0.2,
    },
  });
  candleseries.setData(convertedKlines);

  // VOLUME SERIES
  const volumeSeries = chart.addHistogramSeries({ priceScaleId: "" });
  volumeSeries.priceScale().applyOptions({
    scaleMargins: {
      top: 0.8, // Make space for the volume bars (set to 80% of the chart height)
      bottom: 0,
    },
  });
  const volumeData = convertedKlines.map((kline) => ({
    time: kline.time,
    value: kline.volume,
    color: kline.close > kline.open ? "#26a69a" : "#ef5350", // Green for up, red for down
  }));
  volumeSeries.setData(volumeData);
};

displayChart();
