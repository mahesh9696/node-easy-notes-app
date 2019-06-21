const Note = require("../models/note.model.js");

// Create and Save a new Note
exports.create = (req, res) => {
  let title = req.body.title;
  let content = req.body.content;

  // Validate request
  if (!title || !content) {
    return res.status(400).send({
      message: "Note title or content can not be empty"
    });
  }

  let query = `INSERT INTO notes (title,content) VALUES ('${title}','${content}')`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
      });
    } else {
      res.send({ id: result.insertId });
    }
  });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  let query = `SELECT * FROM notes`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    } else {
      res.send(result);
    }
  });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  let noteId = req.params.noteId;
  let query = `SELECT * FROM notes WHERE id = ${noteId}`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving note."
      });
    } else {
      res.send(result);
    }
  });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  let noteId = req.params.noteId;
  let title = req.body.title;
  let content = req.body.content;

  // Validate request
  if (!title || !content) {
    return res.status(400).send({
      message: "Note title or content can not be empty"
    });
  }

  let query = `UPDATE notes SET title = '${title}', content = '${content}'  WHERE id = ${noteId}`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
      });
    } else {
      res.send(result);
    }
  });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  let noteId = req.params.noteId;
  let query = `DELETE FROM notes WHERE id = ${noteId}`;
  con.query(query, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId
      });
    } else {
      res.send(result);
    }
  });
};
