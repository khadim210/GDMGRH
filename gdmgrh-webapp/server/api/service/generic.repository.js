function repository (Item) {
  this.Item = Item;
  this.save = item => item.save();

  this.remove = (criteria) => {
    Item.remove(criteria).exec();
  };

  this.getAll = (creterias = null) => {
    return (creterias !== null) ? Item.find(creterias).exec() : Item.find().exec();
  };

  this.getAllPopulate = (populate, creterias = null) => {
    return (creterias !== null) ? Item.find(creterias).populate(populate).exec() : Item.find().populate(populate).exec();
  };

  this.getOne = (id) => {
    return Item.findById(id).exec();
  }

  this.getOneBy = (creteria, field = null) => {
    return (field !== null) ? Item.findOne(creteria, field).exec() : Item.findOne(creteria).exec();
  }
  
  this.populateGetOneBy = (creteria, populate, field = null) => {
    return (field !== null) ? Item.findOne(creteria, field).populate(populate).exec()
                              : Item.findOne(creteria).populate(populate).exec();
  }
}

module.exports = repository;
