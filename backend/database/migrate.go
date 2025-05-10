package database

import (
	"btcForecast/models"
	"log"
)

func Migrate() {
	// Migrate the schema (add tables, columns, etc.)
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("Migration failed: ", err)
	}
}
