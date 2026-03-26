package postgres

import (
	"log"
"fmt"
	"github.com/CapregSoft/project-airport-taxi/models"
	
)

func (db *AiportTaxiDBImpl) GetAllBookingsDb() (allbookings []models.AllBookingsResponse, err error) {

	query := `SELECT 
	u.firstname,
	u.email,
	c.car_category,
    b.flight_date_time, 
    b.standard_fare,
	b.total_price,
	b.booking_status,
	b.user_id,
	b.two_way,
	b.id
	
FROM 
    bookings b
JOIN 
    users u ON b.user_id = u.id
JOIN 
    cars c ON b.car_id = c.id;
`

	rows, err := db.dbConn.Query(query)
	if err != nil {
		log.Println("returning as a query error:", err)
		return nil, err
	}
	defer rows.Close()

	var bookings []models.AllBookingsResponse

	for rows.Next() {
		var booking models.AllBookingsResponse
		if err := rows.Scan(
			&booking.FirstName,
			&booking.Email,
			&booking.Fleet,
			&booking.FlightDateTime,
			&booking.StandardFare,
			&booking.TotalFare,
			&booking.BookingStatus,
			&booking.UserID,
			&booking.TwoWay,
			&booking.ID); err != nil {
			return nil, err
		}
		bookings = append(bookings, booking)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return bookings, nil
}

func (db *AiportTaxiDBImpl) UpdateBookingStatusDb(req *models.UpdateBookingStatus) error {

	tx, err := db.dbConn.Begin()
	if err != nil {
		return err
	}

	query := `
	 UPDATE bookings SET booking_Status = $1 WHERE id = $2
	`

	_, err = tx.Exec(query, req.Status, req.ID)
	if err != nil {
		tx.Rollback()
		fmt.Println("Error executing update:", err)
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return nil
}