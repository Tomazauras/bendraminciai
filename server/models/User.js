const firebaseAdmin = require("../config/firebase-config");
const bcrypt = require('bcrypt');

class User {
    static async createUser(userData) {
        try {
            const { email,
                password,
                name,
                surname,
                personalCode,
                phoneNumber,
                userType,
                isBlocked,
                credits } = userData;

            try {
                const existingUser = await firebaseAdmin.auth().getUserByEmail(email);
                if (existingUser) {
                    throw new Error('Email address already exists');
                    
                } 

            } catch (error) {
                console.log("Email doesnt exsist");
                if (error.message === 'Email address already exists'){
                    throw error;
                }
                
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const userRecord = await firebaseAdmin.auth().createUser({
                email: email,
                password: password
            });

            await firebaseAdmin.firestore().collection("users").doc(userRecord.uid).set({
                email,
                password: hashedPassword,
                name,
                surname,
                personalCode,
                phoneNumber,
                userType,
                isBlocked,
                credits 
            });

            console.log("Successfully created new user:", userRecord.uid);
            return userRecord.uid; // Return the user's UID
        } catch (error) {
            console.error("Error creating user:", error);
            throw error; // Rethrow the error for handling in the controller
        }
    };

    static async checkUser(data){
        try {
            
           
            const userRecord = await firebaseAdmin.auth().getUserByEmail(data.email);

            
            const userData = await firebaseAdmin.firestore().collection("users").doc(userRecord.uid).get();
            
           
            if (userData.exists) {
                const { password } = userData.data();
                
                const passwordMatch = await bcrypt.compare(data.password, password);
                
                if (passwordMatch) {
                    return true;
                } else {
                    
                    return false;
                }
            } else {
                
                return false;
            }
        } catch (error) {
            // Handle errors
            console.error("Error checking user:", error);
            return false;
        }
    }

    static async getType (uid){
        try {
            const userData = await firebaseAdmin.firestore().collection("users").doc(uid).get();
            const type = userData.data().userType;
            return type;
        } catch (error) {

        }

    }

    static async appendCredits(userId, amount) {
        try {
            const userRef = firebaseAdmin.firestore().collection("users").doc(userId);
            const docSnapshot = await userRef.get();

            if (!docSnapshot.exists) {
                throw new Error("User not found");
            }

            const userData = docSnapshot.data();
            const currentCredits = userData.credits || 0;
            const newCredits = currentCredits + amount;

            await userRef.update({ credits: newCredits });

            return newCredits;
        } catch (error) {
            console.error("Error updating credits:", error);
            throw error;
        }
    }

    static async subtractCredits(userId, amount) {
        try {
            const userRef = firebaseAdmin.firestore().collection("users").doc(userId);
            const docSnapshot = await userRef.get();

            if (!docSnapshot.exists) {
                throw new Error("User not found");
            }

            const userData = docSnapshot.data();
            const currentCredits = userData.credits || 0;
            const newCredits = currentCredits - amount;

            await userRef.update({ credits: newCredits });

            return newCredits;
        } catch (error) {
            console.error("Error updating credits:", error);
            throw error;
        }
    }

    static async getUserById(userId) {
        const docSnapshot = await firebaseAdmin.firestore().collection("users").doc(userId).get();

        if (!docSnapshot.exists) {
            return null;
        }

        return { id: docSnapshot.id, ...docSnapshot.data() };
    }
}

module.exports = User;