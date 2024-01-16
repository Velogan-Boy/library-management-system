import AppDataSource from '@/data-source';

import { Book } from '@/models';

export const bookRepository = AppDataSource.getRepository(Book);

export const findAllBooks = async () => {
   return await bookRepository.find();
};

export const findBookById = async (id: number) => {
   return await bookRepository.findOneBy({ id });
};

export const createNewBook = async (data: Partial<Book>) => {
   const book = new Book();

   book.title = data.title;
   book.category = data.category;
   book.availableCopies = data.availableCopies;

   return await bookRepository.save(book);
};

export const updateBookUsingPrevBook = async (prev: Book, data: Partial<Book>) => {
   prev.title = data.title || prev.title;
   prev.category = data.category || prev.category;
   prev.availableCopies = data.availableCopies || prev.availableCopies;

   return await bookRepository.save(prev);
};

export const deleteBookByBookObj = async (bookToDelete: Book) => {
   return await bookRepository.remove(bookToDelete);
};

