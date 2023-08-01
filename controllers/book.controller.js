const { Book } = require("../models");
const { success, error } = require("../utils/utils");

exports.index = async (req, res) => {
  try {
    const AllBook = await Book.findAll();
    return success(res, 200, "Data All Books", AllBook);
  } catch (error) {
    return error(res, 400, error.message, {});
  }
};

exports.show = async (req, res) => {
  const id = req.params.id;
  try {
    const findBookById = await Book.findOne({ where: { id: id } });
    if (findBookById) {
      return success(res, 200, "Data All Books", findBookById);
    } else {
      return error(res, 400, "Id Book not found", {});
    }
  } catch (error) {
    return error(res, 500, error.message, {});
  }
};

exports.create = async (req, res) => {
  const userId = req.session.userId;
  const data = {
    userId,
    bookName: req.body.bookName,
    description: req.body.description,
  };
  try {
    const createBook = await Book.create(data);
    return success(res, 200, "Success Create Book", createBook);
  } catch (error) {
    return error(res, 500, error.message, {});
  }
};

exports.update = async (req, res) => {
  const idBook = req.params.id;
  const { bookName, description } = req.body;
  try {
    const updateBook = await Book.update(
      { bookName, description },
      {
        where: {
          id: idBook,
        },
      }
    );
    return success(res, 200, "Success Update Data Book", updateBook);
  } catch (error) {
    return error(res, 500, error.message, {});
  }
};

exports.destroy = async (req, res) => {
  const idBook = req.params.id;
  try {
    const deleteBook = await Book.destroy({ where: { id: idBook } });
    return success(res, 200, "Success Delete Book", deleteBook);
  } catch (error) {
    return error(res, 500, error.message, {});
  }
};
