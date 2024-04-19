class UserModel {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async save() {
        try {
            console.log(this.email + ' | ' + this.password)
            
        } catch (error) {
            console.error(error);   
        }
    }
}

module.exports = UserModel;