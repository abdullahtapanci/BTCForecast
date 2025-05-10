package routes

import "github.com/gin-gonic/gin"

func SetupRoutes(r *gin.Engine) {
	SetupPublicRoutes(r)
	SetupUserRoutes(r)
	SetupWebsocketRoutes(r)
	SetupCoinRoutes(r)
}
