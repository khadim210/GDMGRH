function repository (item) {
    this.item = item;
    this.save = item => item.save(item);

    this.getAll = () => {
        return item.find().exec();
    };

    this.getOne = (id) => {
        return item.findById(id).exec();
    }

    this.getOneBy = (creteria) => {
        return item.findOne(creteria).exec();
    }
}

module.exports = repository;