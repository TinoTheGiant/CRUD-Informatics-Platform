import { Router } from 'express';
import {
  getAffiliates,
  getAffiliateById,
  createAffiliate,
  updateAffiliate,
  deleteAffiliate,
} from '../controllers/affiliate.controller';

const router = Router();

router.get('/', getAffiliates);
router.get('/:id', getAffiliateById);
router.post('/', createAffiliate);
router.put('/:id', updateAffiliate);
router.delete('/:id', deleteAffiliate);

export default router;
