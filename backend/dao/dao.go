package dao

import (
	"btcForecast/models"
	"reflect"

	"gorm.io/gorm"
)

// genericDAO defines a generic interface for data operations
type GenericDAO[T any] interface {
	Create(entity *T) error
	GetByID(id string) (*T, error)
	Update(id string, column string, newData string) error
	Delete(id string) error
}

// baseDAO provides common implementation for the GenericDAO interface
type BaseDAO[T any] struct {
	db        *gorm.DB
	tableName string
}

func NewBaseDAO[T any](db *gorm.DB, tableName string) *BaseDAO[T] {
	return &BaseDAO[T]{
		db:        db,
		tableName: tableName,
	}
}

// create inserts a new record into the database
func (dao *BaseDAO[T]) Create(entity *T) error {
	return dao.db.Table(dao.tableName).Create(entity).Error
}

// getByID retrieves a record by ID
func (dao *BaseDAO[T]) GetByID(id string) (*T, error) {
	var entity T
	result := dao.db.Table(dao.tableName).Where("id = ?", id).First(&entity)
	return &entity, result.Error
}

// update modifies an existing record
func (dao *BaseDAO[T]) Update(id string, column string, newData string) error {
	return dao.db.Model(&models.User{}).Where("id = ?", id).Update(column, newData).Error
}

// delete removes a record by ID
func (dao *BaseDAO[T]) Delete(id string) error {
	//use reflection to create a new instance of type T
	entity := reflect.New(reflect.TypeOf((*T)(nil)).Elem()).Interface()

	//pass the entity to GORM's Delete function
	return dao.db.Table(dao.tableName).Delete(entity, id).Error
}
