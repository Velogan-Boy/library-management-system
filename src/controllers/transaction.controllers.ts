import { Response, Request } from 'express';

import { createNewTransaction, findBookById, findMemberById, issueBook, returnBook } from '@/services';

import { catchAsync } from '@/utils/catchAsync';

// @route POST /transactions
// @desc Create New Transaction (Issue/Return book)
// @body bookId, memberId, status

export const createTransaction = catchAsync(async (req: Request, res: Response) => {
   const { bookId, memberId, status } = req.body;

   const book = await findBookById(bookId);
   const member = await findMemberById(memberId);

   let result: any;

   if (!book || !member) return res.status(404).json({ messge: 'Invalid Transaction' });

   if (status === 'return') returnBook(book);

   if (status === 'issue') {
      result = issueBook(book, member);

      if (!result) return res.status(400).json({ message: 'Book not available at the moment' });
   }

   const newTransaction = createNewTransaction({ book, member, status });

   return res.status(200).json({
      message: 'Transaction is inserted successfully',
      transaction: newTransaction,
   });
});

