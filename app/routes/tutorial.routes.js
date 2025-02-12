import express from 'express';
import {
  createTutorial,
  getAllTutorials,
  getAllPublishedTutorials,
  getTutorialByID,
} from '../controllers/tutorial.controllers.js';

const router = express.Router();

// Route for creating a new tutorial
router.post('/tutorials', createTutorial);

router.get('/tutorials/published', getAllPublishedTutorials);

router.get('/tutorials/:id', getTutorialByID);

router.get('/tutorials', getAllTutorials);

// // UPDATE a tutorial by ID
// router.put('/tutorials/:id', updateTutorial);

// // DELETE a tutorial by ID
// router.delete('/tutorials/:id', deleteTutorial);

// // DELETE all tutorials
// router.delete('/tutorials', deleteAllTutorials);

export default router;
