import { Request, Response } from 'express';

import { createNewBook, deleteBookByBookObj, findAllBooks, findBookById, updateBookUsingPrevBook } from '@/services';
import { catchAsync } from '@/utils/catchAsync';

// @route GET /books
// @desc Get All Books
// @body none

export const getAllBooks = catchAsync(async (_req: Request, res: Response) => {
   const books = await findAllBooks();

   return res.status(200).json({
      message: 'Books fetched successfully',
      result: books.length,
      books,
   });
});

// @route POST /books
// @desc Create a new Book
// @body title,category,availableCopies

export const createBook = catchAsync(async (req: Request, res: Response) => {
   const newBook = await createNewBook(req.body);

   return res.status(201).json({ message: 'Book created successfully', book: newBook });
});

// @route PATCH /books/:id
// @desc Update a Book using id
// @body title,category,availableCopies
// @params id

export const updateBook = catchAsync(async (req: Request, res: Response) => {
   const bookToUpdate = await findBookById(+req.params.id);

   if (!bookToUpdate) {
      return res.status(404).json({ messge: 'Book not found' });
   }

   const updatedBook = await updateBookUsingPrevBook(bookToUpdate, req.body);

   return res.status(200).json({
      message: 'Book updated successfully',
      book: updatedBook,
   });
});

// @route DELETE /books/:id
// @desc Delete a Book using id
// @body none
// @params id

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
   const bookToDelete = await findBookById(+req.params.id);

   if (!bookToDelete) {
      return res.status(404).json({ messge: 'Book not found' });
   }

   const deletedBook = await deleteBookByBookObj(bookToDelete);

   return res.status(200).json({
      message: 'Book deleted successfully',
      book: deletedBook,
   });
});

