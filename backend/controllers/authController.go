package controllers

import (
	"btcForecast/dao"
	"btcForecast/models"
	"btcForecast/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Signup(c *gin.Context) {

	var userSingupRequest models.UserSignupRequest

	if err := c.BindJSON(&userSingupRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var user models.User

	user.ID = utils.GenerateUUID()
	user.Name = userSingupRequest.Name
	user.Email = userSingupRequest.Email
	user.Image = "default.png"
	user.IsAdimn = false

	hashedPassword, err := utils.HashPassword(userSingupRequest.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user.Password = hashedPassword

	err = dao.UserDAO.Create(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save user"})
		return
	}

	token, err := utils.GenerateJWTToken(user.ID, user.IsAdimn)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Couldn't generate token"})
		return
	}

	var userDTO models.UserDTO

	userDTO.ID = user.ID
	userDTO.Name = user.Name
	userDTO.Email = user.Email
	userDTO.Image = user.Image

	fmt.Println(userDTO)

	c.JSON(http.StatusOK, gin.H{
		"message": "User signed up successfully",
		"userID":  user.ID,
		"user":    userDTO,
		"token":   token,
	})
}

func Signin(c *gin.Context) {

	var userSinginRequest models.UserSigninRequest

	if err := c.BindJSON(&userSinginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	user, err := dao.UserDAO.FindByEmail(userSinginRequest.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email"})
		return
	}

	err = utils.ComparePasswords(user.Password, userSinginRequest.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		return
	}

	token, err := utils.GenerateJWTToken(user.ID, user.IsAdimn)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Couldn't generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfuly signed in",
		"userID":  user.ID,
		"token":   token,
	})
}
