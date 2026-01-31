import pool from '../config/db.js';

export const createBooking = async (req, res) => {
    const { userId, serviceId, date } = req.body;

    try {
        const newBooking = await pool.query(
            'INSERT INTO bookings (user_id, service_id, booking_date) VALUES ($1, $2, $3) RETURNING *',
            [userId, serviceId, date]
        );
        res.status(201).json(newBooking.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
};

export const getUserBookings = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.query; // Expect 'provider' or 'customer' in query params

    try {
        let query;
        let params;

        if (role === 'provider') {
            // For providers: Get bookings for services they own
            query = `
                SELECT b.*, s.title as service_name, s.price, u.name as customer_name 
                FROM bookings b
                JOIN services s ON b.service_id = s.id
                JOIN users u ON b.user_id = u.id
                WHERE s.provider_id = $1
                ORDER BY b.booking_date DESC
            `;
            params = [userId];
        } else {
            // For customers: Get their own bookings
            query = `
                SELECT b.*, s.title as service_name, s.image_url 
                FROM bookings b
                JOIN services s ON b.service_id = s.id
                WHERE b.user_id = $1
                ORDER BY b.booking_date DESC
            `;
            params = [userId];
        }

        const bookings = await pool.query(query, params);
        res.json(bookings.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
};
