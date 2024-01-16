import express, { Request, Response } from 'express';

import BooksRouter from './book.routes';
import MemberRouter from './member.routes';
import TransactionRouter from './transaction.routes';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
   res.send('<h1>You hit V1 route</h1>');
});

router.use('/books', BooksRouter);
router.use('/members', MemberRouter);
router.use('/transactions', TransactionRouter);

export default router;
