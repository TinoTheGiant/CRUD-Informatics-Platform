import { Router } from 'express';
import {
  getScores,
  getScoreById,
  createScore,
  updateScore,
  deleteScore,
} from '../controllers/score.controller';

const router = Router();

router.get('/', getScores);
router.get('/:id', getScoreById);
router.post('/', createScore);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);

export default router;
