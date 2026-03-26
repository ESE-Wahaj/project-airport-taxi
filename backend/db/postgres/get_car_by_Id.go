package postgres

import (
	"database/sql"

	"github.com/CapregSoft/project-airport-taxi/models"
)

func (db *AiportTaxiDBImpl) GetCarByIdDB(carID models.DeleteCarRequest) (*models.Car, error) {
    query := `
        SELECT id, mileage_price, available, car_category, image, metadata, created_at
        FROM public.cars
        WHERE id = $1
    `
    
    var car models.Car
    
    err := db.dbConn.QueryRow(query, carID.CarID).Scan(
        &car.Id,
        &car.MileagePrice,
        &car.Available,
        &car.CarCategory, 
        &car.Image,      
        &car.MetaData,   
        &car.CreatedAt,
    )
    
    if err != nil {
        if err == sql.ErrNoRows {
            return nil, nil 
        }
        return nil, err 
    }
    
    return &car, nil
}


