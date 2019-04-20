export class Restaurant {
  _id: String;
  name: String;
  ownerId: String;
  description: String;

  constructor(_id: String, name: String, ownerId: String, description: String) {
    this._id = _id;
    this.name = name;
    this.ownerId = ownerId;
    this.description = description;
  }

}
