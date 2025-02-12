import Tutorial from '../models/tutorial.model.js';

// Create and Save a new Tutorial
export const createTutorial = (req, res) => {
  console.log('Received request body:', req.body);
  if (!req.body.title) {
    res.status(400).json({ message: 'Title cannot be empty!' });
    return;
  }

  console.log('Incoming request body:', req.body); // Debugging

  const newTutorial = {
    title: req.body.title,
    description: req.body.description || '',
    published: req.body.published || false,
  };

  // Save Tutorial in the database
  Tutorial.create(newTutorial, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error inserting tutorial', error: err });
    } else {
      res.status(201).json(data);
    }
  });
};
