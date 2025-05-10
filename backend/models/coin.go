package models

// Define struct for popular coins
type Coin struct {
	ID        int     `json:"id"`
	Name      string  `json:"name"`
	Symbol    string  `json:"symbol"`
	Price     float64 `json:"price"`
	Volume24  float64 `json:"volume_24h"`
	MarketCap float64 `json:"market_cap"`
	Change24  float64 `json:"percent_change_24h"`
}

type ResponseData struct {
	Data []struct {
		ID     int    `json:"id"`
		Name   string `json:"name"`
		Symbol string `json:"symbol"`
		Quote  struct {
			USD struct {
				Price     float64 `json:"price"`
				Volume24  float64 `json:"volume_24h"`
				MarketCap float64 `json:"market_cap"`
				Change24  float64 `json:"percent_change_24h"`
			} `json:"USD"`
		} `json:"quote"`
	} `json:"data"`
}

// Define your Coin structure based on Binance response
type CoinHistory struct {
	OpenTime   int64  `json:"open_time"`
	Open       string `json:"open"`
	High       string `json:"high"`
	Low        string `json:"low"`
	Close      string `json:"close"`
	Volume     string `json:"volume"`
	CloseTime  int64  `json:"close_time"`
	QuoteAsset string `json:"quote_asset"`
}
