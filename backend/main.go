package main

import (
	"btcForecast/config"
	"btcForecast/dao"
	"btcForecast/database"
	"btcForecast/routes"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	//load configuration file
	config.LoadConfig()

	//connect to the database
	database.ConnectDatabase()

	//create all data access objects
	dao.CreateAllDAOs(database.DB)

	//create gin deafult router
	r := gin.Default() //gin.Default returns an instance of gin.Engine, which is the main gin router.
	//In this instance, there are pre-defined middlewares like logger and recovery middleware

	//set cors configurations
	corsConfig := cors.Config{
		AllowOrigins:     []string{"*"}, // Replace "*" with specific domains if needed
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true, // Maximum age for preflight requests
	}

	r.Use(cors.New(corsConfig))

	routes.SetupRoutes(r)

	//database.Migrate()

	//make user images folder static
	r.Static("/userImages", "./static/userImages")

	//start server
	r.Run(fmt.Sprintf(":%s", config.AppConfig.Port))

}
