package server

import (
	// "AiportTaxi/models"
	"encoding/base64"
	"fmt"

	// "fmt"
	// "log"
	"net/http"
	"os"

	"github.com/CapregSoft/project-airport-taxi/api"
	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// func (s *Server) AddCar(c *gin.Context) {

// 	var AddCarCredentials models.AddCarRequest
// 	if err := c.BindJSON(&AddCarCredentials); err != nil {
// 		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
// 		return
// 	}
// 	fmt.Printf("car %+v\n", AddCarCredentials)
// 	if AddCarCredentials.CarCategory == nil || AddCarCredentials.MileagePrice == nil || AddCarCredentials.Image == nil || AddCarCredentials.MetaData == nil {
// 		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "All fields must be provided"})
// 		return
// 	}
// 	car, err := s.api.AddCar(c, AddCarCredentials)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
// 		return
// 	}
// 	if car {
// 		c.JSON(http.StatusConflict, models.Response{
// 			Data:    car,
// 			Message: "Car already exists",
// 			Status:  http.StatusConflict,
// 		})
// 	} else {
// 		c.JSON(http.StatusOK, models.Response{
// 			Message: "Car added successfully",
// 			Status:  http.StatusOK,
// 		})
// 	}

// }

func (s *Server) AddCar(c *gin.Context) {
	// Parse JSON data from the request body
	var AddCarCredentials models.AddCarRequest
	if err := c.BindJSON(&AddCarCredentials); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Invalid JSON format"})
		return
	}

	// Check for image data
	if AddCarCredentials.Image == nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Image is required"})
		return
	}

	base64Prefixes := map[string]string{
		"data:image/jpeg;base64,": ".jpg",
		"data:image/png;base64,":  ".png",
		"data:image/gif;base64,":  ".gif",
		"data:image/svg+xml;base64,": ".svg",
		// Add more types as needed
	}

	imageDataString := *AddCarCredentials.Image
	var fileExtension string

	// Detect the image type and strip the prefix
	for prefix, ext := range base64Prefixes {
		if len(imageDataString) > len(prefix) && imageDataString[:len(prefix)] == prefix {
			imageDataString = imageDataString[len(prefix):]
			fileExtension = ext
			break
		}
	}

	// If no valid prefix is found, return an error
	if fileExtension == "" {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Unsupported image format"})
		return
	}

	// Decode the base64 image data
	imageData, err := base64.StdEncoding.DecodeString(imageDataString)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Invalid image encoding"})
		return
	}

	// Generate a unique filename (using UUID) and set the file path
	newFileName := uuid.New().String() + fileExtension
	filePath := "./public/uploads/" + newFileName

	// Ensure the upload directory exists
	if err := os.MkdirAll("public/uploads", os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to create upload directory"})
		return
	}

	// Write the decoded image data to a file
	if err := os.WriteFile(filePath, imageData, 0644); err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to save image"})
		return
	}

	// Store the file path in AddCarCredentials for database storage
	AddCarCredentials.Image = &filePath // Store the file path
	fmt.Println(AddCarCredentials.Image)

	// Call the API to add the car
	car, err := s.api.AddCar(c, AddCarCredentials)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if car {
		c.JSON(http.StatusConflict, models.Response{
			Data:    car,
			Message: "Car already exists",
			Status:  http.StatusConflict,
		})
	} else {
		c.JSON(http.StatusOK, models.Response{
			Message: "Car added successfully",
			Status:  http.StatusOK,
		})
	}
}

func (s *Server) GetAllCars(c *gin.Context) {
	allCars, err := s.api.GetAllCarsAPI(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Server is unable to get from api"})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "All Cars From Cars table fetched successfully",
		Data:    allCars,
	})

}

func (s *Server) GetCarById(c *gin.Context) {
	carId := &models.DeleteCarRequest{}

	if err := c.BindJSON(&carId); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, carId); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	car, err := s.api.GetCarByIdAPI(c, *carId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{
		Message: "Car retrieved successfully",
		Status:  http.StatusOK,
		Data:    car,
	})
}

// func (s *Server) UpdateCar(c *gin.Context) {
// 	var UpdateCar models.UpdateCarRequest
// 	if err := c.BindJSON(&UpdateCar); err != nil {
// 		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
// 		return
// 	}
// 	err := s.api.UpdateCarAPI(c, UpdateCar)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, models.Response{
// 		Message: "car updated successfully",
// 		Status:  http.StatusOK,
// 	})
// }

func (s *Server) UpdateCar(c *gin.Context) {
	var UpdateCar models.UpdateCarRequest
	if err := c.BindJSON(&UpdateCar); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	if UpdateCar.Image != "" {
		// Define a map for base64 prefixes and their corresponding file extensions
		base64Prefixes := map[string]string{
			"data:image/jpeg;base64,": ".jpg",
			"data:image/png;base64,":  ".png",
			"data:image/gif;base64,":  ".gif",
			"data:image/svg+xml;base64,": ".svg",
			// Add more types as needed
		}

		imageDataString := UpdateCar.Image
		var fileExtension string

		// Detect the image type and strip the prefix
		for prefix, ext := range base64Prefixes {
			if len(imageDataString) > len(prefix) && imageDataString[:len(prefix)] == prefix {
				imageDataString = imageDataString[len(prefix):]
				fileExtension = ext
				break
			}
		}

		// If no valid prefix is found, return an error
		if fileExtension == "" {
			c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Unsupported image format"})
			return
		}

		imageData, err := base64.StdEncoding.DecodeString(imageDataString)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Invalid image encoding"})
			return
		}

		newFileName := uuid.New().String() + fileExtension
		filePath := "./public/uploads/" + newFileName

		if err := os.MkdirAll("public/uploads", os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to create upload directory"})
			return
		}

		if err := os.WriteFile(filePath, imageData, 0644); err != nil {
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: "Failed to save image"})
			return
		}

		UpdateCar.Image = filePath
		fmt.Println(UpdateCar.Image)
}
	err := s.api.UpdateCarAPI(c, UpdateCar)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, models.Response{
		Message: "car updated successfully",
		Status:  http.StatusOK,
		
	})
}


func (s *Server) DeleteCar(c *gin.Context) {
	request := &models.DeleteCarRequest{}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if err := api.ValidateRequest(c, request); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	err := s.api.DeleteCarAPI(c, *request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Error: err.Error()})
		return
	}
	c.JSON(http.StatusOK, models.Response{
		Message: "Car deleted successfully",
		Status:  http.StatusOK,
	})
}
