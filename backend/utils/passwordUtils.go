package utils

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("error hashing the password: %v", err)
	}
	return string(hashedPassword), nil
}

func ComparePasswords(userPassword string, requestPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(requestPassword))
}
