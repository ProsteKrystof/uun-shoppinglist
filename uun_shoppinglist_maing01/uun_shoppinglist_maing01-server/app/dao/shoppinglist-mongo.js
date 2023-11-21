const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppinglistMongo extends UuObjectDao {
    async createSchema() {};

    async create(shoppinglist) {
        return await super.insertOne(shoppinglist);
    }

    async get(awid, id) {
        return await super.findOne({ awid, id });
    }

    async list(awid, pageInfo) {
        return await super.find({ awid }, pageInfo);
    }

    async update(shoppinglist) {
        return await super.findOneAndUpdate({ awid: shoppinglist.awid, id: shoppinglist.id }, shoppinglist, "NONE");
    }

    async delete(awid, id) {
        return await super.deleteOne({ awid, id });
    }
}

module.exports = ShoppinglistMongo;