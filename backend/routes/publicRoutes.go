package routes

import (
	"btcForecast/controllers"

	"github.com/gin-gonic/gin"
)

func SetupPublicRoutes(r *gin.Engine) {
	publicRoutes := r.Group("auth")
	{
		publicRoutes.POST("/signup", controllers.Signup)
		publicRoutes.POST("/signin", controllers.Signin)
	}
}
