export class User {
    _id: String;
    username: string;
    password: string;

    userType: string;
    firstName: string;
    lastName: string;
    email: string;
    restaurantName: string;
    adsFee: number;
    employeePermit: string;
    destription: string;




    constructor( _id, userType, username, password, firstName = 'alice' , lastName = 'chase', email = 'alice@gmail') {
        this._id = _id;
        this.userType = userType;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

