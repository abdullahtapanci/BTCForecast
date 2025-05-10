package controllers

import (
	"btcForecast/dao"
	"btcForecast/models"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetByID(c *gin.Context) {

	id := c.Param("id")

	user, err := dao.UserDAO.GetByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user"})
		return
	}

	var userDTO models.UserDTO

	userDTO.ID = user.ID
	userDTO.Name = user.Name
	userDTO.Email = user.Email
	userDTO.Image = user.Image

	c.JSON(http.StatusOK, gin.H{"user": userDTO})
}

func UpdateUserName(c *gin.Context) {

	id := c.Param("id")

	var nameRequest models.NameRequest

	if err := c.BindJSON(&nameRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	err := dao.UserDAO.Update(id, "name", nameRequest.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user name"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User name successfully updated."})
}

func UpdateUserEmail(c *gin.Context) {

	id := c.Param("id")

	var emailRequest models.EmailRequest

	if err := c.BindJSON(&emailRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	err := dao.UserDAO.Update(id, "email", emailRequest.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User email successfully updated."})
}

func UpdateUserImage(c *gin.Context) {

	id := c.Param("id")

	// Parse the file from the form data
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to get the image file",
		})
		return
	}

	// Generate a unique filename (UUID + original file extension)
	fileExtension := filepath.Ext(file.Filename)
	uniqueFilename := uuid.New().String() + fileExtension

	uploadPath := "./static/userImages"

	// Save the uploaded file to the server
	savePath := filepath.Join(uploadPath, uniqueFilename)
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to save the image file",
		})
		return
	}

	//remove the previous image
	user, err := dao.UserDAO.GetByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user"})
		return
	}
	if user.Image != "default.png" {
		deletePath := filepath.Join(uploadPath, user.Image)
		err = os.Remove(deletePath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete previous user image"})
			return
		}
	}

	//update user image
	err = dao.UserDAO.Update(id, "image", uniqueFilename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user image"})
		return
	}

	// If successful, return the file path or URL (you can adjust as per your needs)
	c.JSON(http.StatusOK, gin.H{
		"message": "Image uploaded successfully",
		"file":    uniqueFilename,
	})
}
