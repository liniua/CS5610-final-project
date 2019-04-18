export class Restaurant {
    _id: string;
    name: string;
    ownerId: string;
    type: string;
    description: string;
    restaurantUrl: string;
    address: string;
    city: string;
    zip: string;
    adsFee: number;


    constructor(_id, ownerId , adsFee = 0, type = '', name= '', description = '',
                restaurantUrl = '', address = '', city = '', zip = '' ) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.type = type;
        this.restaurantUrl = restaurantUrl;
        this.address = address;
        this.city = city;
        this.zip = zip;
        this.adsFee = adsFee;
    }
}
