package dao

import (
	"btcForecast/models"

	"gorm.io/gorm"
)

var UserDAO UserDAOInterface

type UserDAOInterface interface {
	GenericDAO[models.User]
	FindByEmail(email string) (models.User, error)
}

type userDAOImpl struct {
	*BaseDAO[models.User]
}

func NewUserDAO(db *gorm.DB) UserDAOInterface {
	return &userDAOImpl{
		BaseDAO: NewBaseDAO[models.User](db, "users"),
	}
}

// add a custom method findByEmail
func (dao *userDAOImpl) FindByEmail(email string) (models.User, error) {
	var user models.User
	result := dao.db.Table(dao.tableName).Where("email = ?", email).First(&user)
	return user, result.Error
}
