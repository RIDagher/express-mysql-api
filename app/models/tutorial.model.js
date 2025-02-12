import db from './db.js';

// Constructor function
const Tutorial = function (tutorial = {}) {
  this.title = tutorial.title || '';
  this.description = tutorial.description || '';
  this.published = tutorial.published || false;
};

// Create a new tutorial (INSERT)
Tutorial.create = (newTutorial, result) => {
  db.query('INSERT INTO tutorials SET ?', newTutorial, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Created tutorial:', { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

// Find tutorial by ID
Tutorial.findById = (id, result) => {
  console.log('Querying database for tutorial with ID:', id);

  db.query('SELECT * FROM tutorials WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('SQL Query Error', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('Tutorial found', res[0]);
      result(null, res[0]);
    } else {
      console.log('Tutorial not found in database');
      result({ kind: 'not_found' }, null);
    }
  });
};

// Find all tutorials
Tutorial.getAll = (result) => {
  db.query('SELECT * FROM tutorials', (err, res) => {
    if (err) {
      console.log('Database error', err);
      return result(err, null);
    }
    console.log('Fetched tutorials', res);
    result(null, res);
  });
};

// find all published tutorials
Tutorial.getAllPublished = (result) => {
  db.query('SELECT * FROM tutorials WHERE published = true', (err, res) => {
    if (err) {
      console.log('Database error:', err);
      return result(err, null);
    }
    console.log('Fetched published tutorials:', res);
    result(null, res);
  });
};

// Tutorial.updateById = (id, tutorial, result) => {
//   db.query(
//     'UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?',
//     [tutorial.title, tutorial.description, tutorial.published, id],
//     (err, res) => {
//       if (err) return result(err, null);
//       result(null, { id, ...tutorial });
//     }
//   );
// };

// Tutorial.remove = (id, result) => {
//   db.query('DELETE FROM tutorials WHERE id = ?', [id], (err, res) => {
//     if (err) return result(err, null);
//     result(null, res);
//   });
// };

// Tutorial.removeAll = (result) => {
//   db.query('DELETE FROM tutorials', (err, res) => {
//     if (err) return result(err, null);
//     result(null, res);
//   });
// };

export default Tutorial;
