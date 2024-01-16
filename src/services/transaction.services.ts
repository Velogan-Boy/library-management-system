import AppDataSource from '@/data-source';

import { Transaction, Book, Member } from '@/models';
import { bookRepository } from '@/services';

export const trasactionRepository = AppDataSource.getRepository(Transaction);

export const createNewTransaction = async (data: Partial<Transaction>) => {
   const trans = new Transaction();
   trans.book = data.book;
   trans.member = data.member;
   trans.status = data.status;

   return await trasactionRepository.save(trans);
};

export const issueBook = async (book: Book, member: Member) => {
   if (book.availableCopies > 0) {
      book.availableCopies -= 1;
      return await bookRepository.save(book);
   } else {
      return null;
   }
};

export const returnBook = async (book: Book) => {
   book.availableCopies += 1;
   return await bookRepository.save(book);
};


