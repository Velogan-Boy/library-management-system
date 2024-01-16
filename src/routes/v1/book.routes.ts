import express, { Router } from 'express';

import { deleteBook, getAllBooks, createBook, updateBook } from '@/controllers/book.controllers';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;

