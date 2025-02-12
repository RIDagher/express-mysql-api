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

// Get a tutorial by ID
export const getTutorialByID = (req, res) => {
  console.log('Received request to fetch a tutorial wit ID:', req.params.id);

  // Convert ID to integer and validate
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    console.log('Invalid ID format', req.params.id);
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // Query the Database
  Tutorial.findById(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        console.log(`No tutorial found with ID: ${id}`);
        return res
          .status(404)
          .json({ message: `Tutorial with ID ${id} not found` });
      } else {
        console.log('Error retrieving tutorial:', err);
        return res
          .status(500)
          .json({ message: 'Error retrieving tutorial', error: err });
      }
    }
    console.log('Found tutorial:', data);
    return res.status(200).json(data);
  });
};

// Retrieve all tutorials from database
export const getAllTutorials = (req, res) => {
  console.log('Fetching all tutorials..');

  Tutorial.getAll((err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Error retrieving tutorial', error: err });
    }
    res.status(200).json(data);
  });
};

// Retrieve published tutorial
export const getAllPublishedTutorials = (req, res) => {
  console.log('Fetchin published tutorials');

  Tutorial.getAllPublished((err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Error retrieving published tutorials', error: err });
    }
    res.status(200).json(data);
  });
};

// // Update tutorial
// export const updateTutorial = (req, res) => {
//   const tutorialId = req.params.id;
//   console.log(`Updating tutorial with ID: ${tutorialId}`, req.body); //  Debugging log

//   Tutorial.updateById(tutorialId, req.body, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         return res
//           .status(404)
//           .json({ message: `Tutorial with id ${tutorialId} not found.` });
//       }
//       return res.status(500).json({
//         message: `Error updating tutorial with id ${tutorialId}`,
//         error: err,
//       });
//     }
//     res.status(200).json({
//       message: `Tutorial with id ${tutorialId} updated successfully`,
//       data,
//     });
//   });
// };

// // Delete
// export const deleteTutorial = (req, res) => {
//   const tutorialId = req.params.id;
//   console.log(`Deleting tutorial with ID: ${tutorialId}`); //  Debugging log

//   Tutorial.remove(tutorialId, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         return res
//           .status(404)
//           .json({ message: `Tutorial with id ${tutorialId} not found.` });
//       }
//       return res.status(500).json({
//         message: `Error deleting tutorial with id ${tutorialId}`,
//         error: err,
//       });
//     }
//     res.status(200).json({
//       message: `Tutorial with id ${tutorialId} deleted successfully.`,
//     });
//   });
// };
//  // Delete All
// export const deleteAllTutorials = (req, res) => {
//   console.log('Deleting all tutorials...'); // Debugging log

//   Tutorial.removeAll((err, data) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ message: 'Error deleting all tutorials', error: err });
//     }
//     res
//       .status(200)
//       .json({
//         message: 'All tutorials deleted successfully.',
//         deletedCount: data.affectedRows,
//       });
//   });
// };
