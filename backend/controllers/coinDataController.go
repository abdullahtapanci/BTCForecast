package controllers

import (
	"btcForecast/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCoinData(c *gin.Context) {
	coins, err := services.GetCoinData(10)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get coin datas"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"coins": coins})
}

func GetCoinHistory(c *gin.Context) {

	symbol := c.Param("symbol")

	coinHist, err := services.GetCoinHistory(symbol)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get coin history"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"coinHist": coinHist})
}
