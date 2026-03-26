package api

import (
	"errors"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) GetCarByIdAPI(c *gin.Context,  carID models.DeleteCarRequest) (*models.Car, error) {
	carExists, err := api.postgres.CarExistsDb(carID)
	if err != nil {
		return nil, err
	}

	if !carExists {
		return nil, errors.New("car not found")
	}

	category, err := api.postgres.GetCarByIdDB(carID)
	if err != nil {
		return nil, err
	}

	if category == nil {
		return nil, errors.New("car with this id not found")
	}

	return category, nil
}
