export class Page {
    _id: string;
    name: string;
    developerId: string;
    restaurantName: string;
    restaurantWebUrl: string;
    description: string;

    constructor(_id, name= '', developerId, description= '') {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.developerId = developerId;
    }

}
