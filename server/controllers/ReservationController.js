const Reservation = require('../models/Reservation');

class ReservationController {
    async addReservation(req, res) {
        try {
            const { startDate, endDate, reservedCredits, fk_userID, fk_postID } = req.body;
            const reservationId = await Reservation.addReservation({
                startDate,
                endDate,
                reservedCredits,
                fk_userID,
                fk_postID
            });
            res.status(200).json({ success: true, reservationId });
        } catch (error) {
            console.error("Error adding reservation:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getReservationsByPostId(req, res) {
        try {
            const reservations = await Reservation.getReservationsByPostId(req.params.postId);
            res.status(200).json(reservations);
        } catch (error) {
            console.error("Error fetching reservations by post ID:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = ReservationController;
