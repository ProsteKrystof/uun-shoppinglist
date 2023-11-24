const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TaskMongo extends UuObjectDao {
    async createSchema() {};

    async create(task) {
        return await super.insertOne(task);
    }

    async get(awid, id) {
        return await super.findOne({ awid, id });
    }

    async list(awid, pageInfo) {
        return await super.find({ awid }, pageInfo);
    }

    async listByListId(awid, listId, pageInfo) {
        return await super.find({ awid, listId }, pageInfo);
    }

    async update(task) {
        return await super.findOneAndUpdate({ awid: task.awid, id: task.id }, task, "NONE");
    }

    async delete(awid, id) {
        return await super.deleteOne({ awid, id });
    }
}

module.exports = TaskMongo;