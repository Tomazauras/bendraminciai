const firebaseAdmin = require("../config/firebase-config");

class Reservation {
    static async addReservation(reservationData) {
        try {
            const { startDate, endDate, reservedCredits, fk_userID, fk_postID } = reservationData;
            const reservationId = firebaseAdmin.firestore().collection("reserved_post").doc().id;

            await firebaseAdmin.firestore().collection("reserved_post").doc(reservationId).set({
                startDate: firebaseAdmin.firestore.Timestamp.fromDate(new Date(startDate)),
                endDate: firebaseAdmin.firestore.Timestamp.fromDate(new Date(endDate)),
                reservedCredits,
                fk_userID,
                fk_postID
            });

            return reservationId;
        } catch (error) {
            console.error("Error adding reservation:", error);
            throw error;
        }
    }

    static async getReservationById(reservationId) {
        try {
            const docSnapshot = await firebaseAdmin.firestore().collection("reserved_post").doc(reservationId).get();
                
            if (!docSnapshot.exists) {
                return null; // Return null if the reservation doesn't exist
            }

            return { id: docSnapshot.id, ...docSnapshot.data() };
        } catch (error) {
            console.error("Error fetching reservation:", error);
            throw error;
        }
    }

    static async getReservationsByUserId(userId) {
        try {
            const snapshot = await firebaseAdmin.firestore().collection("reserved_post").where('fk_userID', '==', userId).get();
            const reservations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return reservations;
        } catch (error) {
            console.error("Error fetching reservations by user ID:", error);
            throw error;
        }
    }

    static async getReservationsByPostId(postId) {
        try {
            const snapshot = await firebaseAdmin.firestore().collection("reserved_post").where('fk_postID', '==', postId).get();
            const reservations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return reservations;
        } catch (error) {
            console.error("Error fetching reservations by post ID:", error);
            throw error;
        }
    }

    static async deleteReservation(reservationId) {
        try {
            await firebaseAdmin.firestore().collection("reserved_post").doc(reservationId).delete();
            return { success: true, message: 'Reservation deleted successfully' };
        } catch (error) {
            console.error("Error deleting reservation:", error);
            throw error;
        }
    }
}

module.exports = Reservation;
