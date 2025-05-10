package services

import (
	"btcForecast/models"
	"compress/gzip"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"time"
)

var apiKey = "97b8da01-f4b6-4f4c-b8c0-b0070d634cc0"

func GetCoinData(limit int) (string, error) {

	var apiUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

	client := &http.Client{}
	req, err := http.NewRequest("GET", apiUrl, nil)
	if err != nil {
		return "", err
	}

	// Add query parameters for limit
	query := req.URL.Query()
	query.Add("limit", fmt.Sprintf("%d", limit))
	req.URL.RawQuery = query.Encode()

	// Set headers
	req.Header.Set("X-CMC_PRO_API_KEY", apiKey)
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Accept-Encoding", "gzip")

	// Send the request
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Check for non-200 response
	if resp.StatusCode != http.StatusOK {
		return "", errors.New(fmt.Sprintf("Failed to fetch data: %s", resp.Status))
	}

	// Handle compressed responses (gzip)
	var reader io.ReadCloser
	if resp.Header.Get("Content-Encoding") == "gzip" {
		reader, err = gzip.NewReader(resp.Body)
		if err != nil {
			return "", err
		}
		defer reader.Close()
	} else {
		reader = resp.Body
	}

	// Read and parse the response
	body, err := ioutil.ReadAll(reader)
	if err != nil {
		return "", err
	}

	var responseData models.ResponseData
	if err := json.Unmarshal(body, &responseData); err != nil {
		return "", err
	}

	// Extract data
	var coins []models.Coin
	for _, data := range responseData.Data {
		coin := models.Coin{
			ID:        data.ID,
			Name:      data.Name,
			Symbol:    data.Symbol,
			Price:     data.Quote.USD.Price,
			Volume24:  data.Quote.USD.Volume24,
			MarketCap: data.Quote.USD.MarketCap,
			Change24:  data.Quote.USD.Change24,
		}
		coins = append(coins, coin)
	}

	// Convert coins to JSON
	coinsJSON, err := json.Marshal(coins)
	if err != nil {
		return "", errors.New(fmt.Sprintf("Error converting coins to JSON: %s", err))
	}
	return string(coinsJSON), nil
}

func GetCoinHistory(symbol string) (string, error) {
	// Get current time and calculate timestamps
	now := time.Now()
	todayTimestamp := now.Unix() * 1000 // Multiply by 1000 to convert to milliseconds
	thirtyDaysAgo := now.AddDate(0, 0, -30)
	thirtyDaysTimestamp := thirtyDaysAgo.Unix() * 1000 // Multiply by 1000 to convert to milliseconds

	// Prepare the Binance API URL for historical klines (candlestick) data
	url := fmt.Sprintf("https://api.binance.com/api/v3/klines?symbol=%s&interval=1d&startTime=%d&endTime=%d", symbol, thirtyDaysTimestamp, todayTimestamp)

	client := &http.Client{Timeout: 10 * time.Second} // Set timeout for better handling
	resp, err := client.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Check for non-200 response
	if resp.StatusCode != http.StatusOK {
		return "", errors.New(fmt.Sprintf("Failed to fetch data: %s", resp.Status))
	}

	// Read and parse the response
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	// Parse the response JSON into a 2D array since Binance returns an array of arrays
	var responseData [][]interface{}
	if err := json.Unmarshal(body, &responseData); err != nil {
		return "", err
	}

	// Check if data exists
	if len(responseData) == 0 {
		return "", errors.New("no data found for the given symbol")
	}

	// Convert the data to a structured format
	var coins []models.CoinHistory
	for _, entry := range responseData {
		coins = append(coins, models.CoinHistory{
			OpenTime:   int64(entry[0].(float64)),
			Open:       entry[1].(string),
			High:       entry[2].(string),
			Low:        entry[3].(string),
			Close:      entry[4].(string),
			Volume:     entry[5].(string),
			CloseTime:  int64(entry[6].(float64)),
			QuoteAsset: entry[7].(string),
		})
	}

	// Convert the coin data to JSON
	coinsJSON, err := json.Marshal(coins)
	if err != nil {
		return "", errors.New(fmt.Sprintf("Error converting coins to JSON: %s", err))
	}

	return string(coinsJSON), nil
}
