function repository (item) {
    this.item = item;
    this.save = item => item.save(item);

    this.remove = (criteria) => {
        item.remove(criteria).exec();
    };

    this.getAll = (creterias = null) => {
        return (creterias !== null) ? item.find(creterias).exec() : item.find().exec();
    };

    this.getAllPopulate = (populate, creterias = null) => {
        return (creterias !== null) ? item.find(creterias).populate(populate).exec() : item.find().populate(populate).exec();
    };

    this.getOne = (id) => {
        return item.findById(id).exec();
    }

    this.getOneBy = (creteria, field) => {
        return (field !== null) ? item.findOne(creteria, field).exec() : item.findOne(creteria).exec();
    }
}

module.exports = repository;