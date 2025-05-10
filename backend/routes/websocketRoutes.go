package routes

import (
	"btcForecast/websocket"

	"github.com/gin-gonic/gin"
)

func SetupWebsocketRoutes(r *gin.Engine) {
	websocketRoutes := r.Group("ws")
	{
		websocketRoutes.GET("/", websocket.HandleWebSocket)
	}
}
