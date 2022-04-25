/* eslint-disable eqeqeq */
import Books from './modules/books.js';

const bookList = document.querySelector('.bookList');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const addBookBtn = document.querySelector('.btn-add');

class Handlers {
  static addBook() {
    let bookStore;
    if (localStorage.getItem('books') === null) {
      bookStore = [];
    } else {
      bookStore = JSON.parse(localStorage.getItem('books'));
    }
    const book = new Books(bookAuthor.value, bookTitle.value);
    bookStore.push(book);
    bookList.innerHTML += `
              <div class="display-books">
              <p>${book.bookTitle}</p> 
              <p>${book.bookAuthor}</p>
              <button class="rmv-btn" data-id=${book.id} type="button">Remove</button><br/>
              </div>
              `;
    localStorage.setItem('books', JSON.stringify(bookStore));
    bookAuthor.value = '';
    bookTitle.value = '';
  }

  static retrieveLSBook() {
    if (localStorage.length > 0) {
      const books = JSON.parse(localStorage.getItem('books'));
      books.forEach((book) => {
        bookList.innerHTML += `
              <div class="display-books">
              <p>${book.bookTitle} </p>
              <p>${book.bookAuthor}</p>
              <button class="rmv-btn" data-id=${book.id} type="button">Remove</button><br/>
              </div>
              `;
      });
    }
  }

  // remove book from storage
  static lsBookErase(bId) {
    if (localStorage.length > 0) {
      const books = JSON.parse(localStorage.getItem('books'));
      books.forEach((book, bIndx) => {
        // check if UI book id matches with the on in storage
        if (book.id == bId) {
          books.splice(bIndx, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
}