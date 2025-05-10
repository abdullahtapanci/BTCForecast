package routes

import (
	"btcForecast/controllers"
	middleware "btcForecast/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupUserRoutes(r *gin.Engine) {
	userRoutes := r.Group("user")
	userRoutes.Use(middleware.AuthMiddleware())
	{
		userRoutes.GET("/getByID/:id", controllers.GetByID)
		userRoutes.POST("/updateUserName/:id", controllers.UpdateUserName)
		userRoutes.POST("/updateUserEmail/:id", controllers.UpdateUserEmail)
		userRoutes.POST("/imageUpload/:id", controllers.UpdateUserImage)
	}
}
