package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `gorm:"type:char(36);primaryKey" json:"id"`
	Name      string    `json:"name"`
	Email     string    `gorm:"unique" json:"email"`
	Password  string    `json:"password"`
	Image     string    `json:"image"`
	IsAdimn   bool      `json:"isAdmin"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (User) TableName() string {
	return "users"
}

// user data transfer object
type UserDTO struct {
	ID      uuid.UUID `json:"id"`
	Name    string    `json:"name"`
	Email   string    `json:"email"`
	Image   string    `json:"image"`
	IsAdimn bool      `json:"isAdmin"`
}

type NameRequest struct {
	Name string `json:"name"`
}

type EmailRequest struct {
	Email string `json:"email"`
}

type ImageRequest struct {
	Image string `json:"image"`
}

// user signin request object
type UserSigninRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// user signup request object
type UserSignupRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
