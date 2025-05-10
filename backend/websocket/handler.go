package websocket

import (
	"btcForecast/services"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func HandleWebSocket(c *gin.Context) {
	// handle token verificatipon

	//token := c.Query("token")

	// tokenJWT, exists := c.Get("token")
	// if !exists {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not found"})
	// 	return
	// }

	// if token != tokenJWT {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
	// 	return
	// }

	conn, err := Upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.String(http.StatusBadRequest, "Could not open websocket connection")
		return
	}
	defer conn.Close()
	// Handle WebSocket communication
	for {

		coins, err := services.GetCoinData(20)
		if err != nil {
			fmt.Println("Error getting coin data:", err)
			// Optionally send an error message to the client
			errMsg := fmt.Sprintf("Error fetching coin data: %s", err)
			conn.WriteMessage(websocket.TextMessage, []byte(errMsg))
			return
		}

		conn.WriteMessage(websocket.TextMessage, []byte(coins))
		time.Sleep(10 * time.Minute)
	}
}
