import express from 'express';

import { createTransaction } from '@/controllers/transaction.controllers';

const router = express.Router();

router.post('/', createTransaction);

export default router;

