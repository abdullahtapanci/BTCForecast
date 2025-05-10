package dao

import "gorm.io/gorm"

// create all data access objects
func CreateAllDAOs(db *gorm.DB) {
	UserDAO = NewUserDAO(db)
}
