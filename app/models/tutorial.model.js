import db from './db.js';

// Constructor function
const Tutorial = function (tutorial = {}) {
  this.title = tutorial.title || '';
  this.description = tutorial.description || '';
  this.published = tutorial.published || false;
};

// Define CRUD Methods AFTER defining the constructor

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

export default Tutorial;
