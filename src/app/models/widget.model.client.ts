export class Widget {
    _id: String;
    name: String;
    widgetType: String;
    pageId: String;
    size: String;
    text: String;
    url: String;
    width: String;
    position: Number;
    placeholder: String;
    height: String;
    rows: Number;
    icon: String;
    deletable: Boolean;
    formatted: Boolean;




    constructor( _id, name = '', widgetType, pageId, position, size= '', text = '', width = '', url = ''
        , placeholder = '', height = '' , rows = 1, icon = '', deletable = false, formatted = false) {
        this._id = _id;
        this.name = name;
        this.widgetType = widgetType;
        this.pageId = pageId;
        this.size = size;
        this.text = text;
        this.url = url;
        this.width = width;
        this.position = position;
        this.deletable = deletable;
        this.formatted = formatted;
        this.rows = rows;
        this.height = height;
        this.placeholder = placeholder;
        this.icon = icon;
    }
}
