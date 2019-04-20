export class Restaurant {
  _id: String;
  name: String;
  ownerId: String;
  description: String;
  address: String;
  zipcode: String;

  constructor(_id: String, name: String, ownerId: String, description: String, address: String, zipcode: String) {
    this._id = _id;
    this.name = name;
    this.ownerId = ownerId;
    this.description = description;
    this.address = address;
    this.zipcode = zipcode;
  }

}
