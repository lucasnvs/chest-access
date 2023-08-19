Storage.prototype.get = function (key) {
    var tableObject = this.getItem(key);
    return tableObject && JSON.parse(tableObject);
};

Storage.prototype.set = function (key, object) {
    let data = this.get(key);
    if (data === null) {
        data = [];
        object.id = 1;
    }
    object.id = data.length + 1;

    data.push(object)
    this.setItem(key, JSON.stringify(data));

    let testData = this.get(key); // check sucessful
    let testDataString = JSON.stringify(testData[testData.length - 1]);
    let objectString = JSON.stringify(object);

    if (testData.length == 0 || testDataString === objectString) {
        return true;
    }
    return false;
};

if(localStorage.get("config") == null) {
    const config = {
        TOKEN: "",
        ID_CHAT_BAU: "",
        LAST_ID_MESSAGE: ""
    }
    localStorage.setItem("config", JSON.stringify(config))
}