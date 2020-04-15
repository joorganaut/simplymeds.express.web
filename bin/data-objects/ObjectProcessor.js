class ObjectProcessor {
    MapModelFromObject (model, obj) {
        for (var prop in obj) {
            //if (model.hasOwnProperty(prop)) {
                if (model[prop] !== obj[prop] && obj[prop] !== null) {
                    model[prop] = obj[prop];
                }
            //}
        }
        return model;
    }
}
module.exports = ObjectProcessor