import { Router } from 'express';
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workout.controller';

const router = Router();

router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);


export default router;
