export class User {
    _id: String;
    username: string;
    password: string;

    userType: string;
    firstName: string;
    lastName: string;
    email: string;
    employeePermit: string;
    description: string;




    constructor( _id, username, password, userType, employeePermit = '', firstName = 'alice' , lastName = 'chase',
                 email = 'alice@gmail', description = '') {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.employeePermit = employeePermit;
        this.description = description;
        this.userType = userType;
    }
}

