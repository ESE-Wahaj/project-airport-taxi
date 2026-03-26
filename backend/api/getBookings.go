package api

import (
	"net/http"

	"github.com/CapregSoft/project-airport-taxi/models"
	"github.com/gin-gonic/gin"
)

func (api *AiportTaxiAPIImpl) GetAllBookingsAPI(c *gin.Context) ([]models.AllBookingsResponse, error) {

	allBookingDB, err := api.postgres.GetAllBookingsDb()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return nil, err
	}

	return allBookingDB, nil

}

func (api *AiportTaxiAPIImpl) UpdateBookingStatusAPI(c *gin.Context, req *models.UpdateBookingStatus) error {
	if err := api.postgres.UpdateBookingStatusDb(req); err != nil {
		return err
	}
	return nil
}