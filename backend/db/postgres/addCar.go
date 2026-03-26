package postgres

import (
	"database/sql"
	"log"
	// "time"

	"github.com/CapregSoft/project-airport-taxi/models"
)


func (db *AiportTaxiDBImpl) AddCarDb(AddCarCredentials models.AddCarRequest) (bool, error) {
	query := `INSERT INTO cars(car_category, mileage_price, image, metadata, created_at ) VALUES($1, $2, $3, $4, $5)`
	_, err := db.dbConn.Exec(query, AddCarCredentials.CarCategory, AddCarCredentials.MileagePrice, AddCarCredentials.Image, AddCarCredentials.MetaData, AddCarCredentials.CreatedAt)
	if err != nil {
		return false, err
	}

	return false, nil
}

func (db *AiportTaxiDBImpl) GetAllCarsDb() (allcars []models.Car, err error) {
	query := `SELECT id, car_category, mileage_price, image, available, metadata, created_at FROM cars;`
	rows, err := db.dbConn.Query(query)
	if err != nil {
		log.Println("returning as a query error")
		return
	}
	defer rows.Close()
	var cars []models.Car

	for rows.Next() {
		var car models.Car
		if err := rows.Scan(&car.Id, &car.CarCategory, &car.MileagePrice, &car.Image, &car.Available, &car.MetaData, &car.CreatedAt); err != nil {
			return nil, err
		}
		cars = append(cars, car)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return cars, nil
}
func (db *AiportTaxiDBImpl) UpdateCarDb(Updatecar models.UpdateCarRequest) error {
	if (Updatecar.Image !=""){
    query := `UPDATE cars SET mileage_price = $1 , car_category = $2 , image = $3, metadata = $4 WHERE id = $5 `
    _, err := db.dbConn.Exec(query, Updatecar.MileagePrice, Updatecar.CarCategory , Updatecar.Image, Updatecar.MetaData, Updatecar.CarID)
    if err != nil {
        return err
    }
} else{
	query := `UPDATE cars SET mileage_price = $1 , car_category = $2 , metadata = $3 WHERE id = $4 `
    _, err := db.dbConn.Exec(query, Updatecar.MileagePrice, Updatecar.CarCategory , Updatecar.MetaData, Updatecar.CarID)
    if err != nil {
        return err
    }
}
    return nil
}

func (db *AiportTaxiDBImpl) CarExistsDb(carId models.DeleteCarRequest) (bool, error) {
	var exists bool

	query := `
    SELECT EXISTS(SELECT 1 FROM cars WHERE id = $1)
    `
	err := db.dbConn.QueryRow(query, carId.CarID).Scan(&exists)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err
	}

	return exists, nil
}

func (db *AiportTaxiDBImpl) DeleteCarDb(car models.DeleteCarRequest) error {
	query := `DELETE FROM cars WHERE id = $1`
	_, err := db.dbConn.Exec(query, car.CarID)
	if err != nil {
		return err
	}
	return nil
}