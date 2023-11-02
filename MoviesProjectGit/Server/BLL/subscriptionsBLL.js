const Sub = require("../models/subscriptionsModel");

const GetAll = () => {
  return Sub.find({});
};

const GetById = (id) => {
  return Sub.findById({ _id: id });
};

const AddItem = async (obj) => {
  const sub = new Sub(obj);
  await sub.save();
  return sub;
};

const Update = async (id, obj) => {
  await Sub.findByIdAndUpdate(id, obj);
  return obj;
};

const Delete = async (id) => {
  await Sub.findByIdAndDelete(id);
  return id;
};

module.exports = {
  GetAll,
  GetById,
  AddItem,
  Update,
  Delete,
};
