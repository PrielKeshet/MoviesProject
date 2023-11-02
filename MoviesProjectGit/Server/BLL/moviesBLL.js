const Movie = require("../models/moviesModel");

const GetAll = () => {
  return Movie.find({});
};

const GetById = (id) => {
  return Movie.findById({ _id: id });
};

const AddItem = async (obj) => {
  const movie = new Movie(obj);
  await movie.save();
  return movie;
};

const Update = async (id, obj) => {
  await Movie.findByIdAndUpdate(id, obj);
  return obj;
};

const Delete = async (id) => {
  await Movie.findByIdAndDelete(id);
  return id;
};

module.exports = {
  GetAll,
  GetById,
  AddItem,
  Update,
  Delete,
};
