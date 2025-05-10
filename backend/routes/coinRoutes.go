package routes

import (
	"btcForecast/controllers"

	"github.com/gin-gonic/gin"
)

func SetupCoinRoutes(r *gin.Engine) {
	coinRoutes := r.Group("coin")
	{
		coinRoutes.POST("/coinHistory/:symbol", controllers.GetCoinHistory)
	}
}
