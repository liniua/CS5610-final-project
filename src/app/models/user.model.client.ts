export class User {
  _id: String;
  username: String;
  password: String;
  userType: String;
  firstName: String;
  lastName: String;
  email: String;

  constructor(_id, username, userType, password, firstname, lastname, email) {
    this._id = _id;
    this.username = username;
    this.userType = userType;
    this.password = password;
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
  }
}
