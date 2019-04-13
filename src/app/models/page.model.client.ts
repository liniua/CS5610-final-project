export class Page {
    _id: string;
    name: string;
    restaurantId: string;
    developerId: string;
    description: string;
    pageType: string;
    showThisPage: boolean;


    constructor(_id, developerId , pageType, name= '', restaurantId = '', description= '', showThisPage = false) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.developerId = developerId;
        this.pageType = pageType;
        this.showThisPage = showThisPage;
        this.restaurantId =  restaurantId;
    }

}
