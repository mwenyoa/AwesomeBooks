/* eslint-disable eqeqeq */
import Books from './modules/books.js';
import luxon from './modules/luxon.js';

const bookList = document.querySelector('.bookList');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const addBookBtn = document.querySelector('.btn-add');
const timeShow = document.querySelector('.show-time');
const dateTime = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_FULL);
timeShow.textContent = dateTime;
class Handlers {
  static addBook(e) {
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

    const alertSection = document.querySelector('.alert-msg');
    const message = document.createElement('p');
    if (bookAuthor.value === '' && bookTitle.value === '') {
      e.preventDefault();
      message.innerText = 'Please Add your book details.';
      alertSection.append(message);
      setTimeout(() => {
        message.style.display = 'none';
      }, 3000);
    }
  }

  static retrieveLSBook() {
    if (localStorage.length > 0) {
      const books = JSON.parse(localStorage.getItem('books'));
      books.forEach((book) => {
        bookList.innerHTML += `
              <div class="display-books">
              <p>${book.bookTitle} </p>
              <p>${book.bookAuthor}</p>
              <button class="rmv-btn" data-id=${book.id} type="button">Remove</button>
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

// Add event listners
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  Handlers.addBook();
});

window.addEventListener('DOMContentLoaded', Handlers.retrieveLSBook);
bookList.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('rmv-btn')) {
    ev.target.parentElement.remove();
    Handlers.lsBookErase(ev.target.getAttribute('data-id'));
  }
});

// select nav items
const listBooks = document.querySelector('.list-books');
const showAddBooks = document.querySelector('.add-books');
const showContact = document.querySelector('.contact-sec');
const addBookSec = document.querySelector('.addBook');
const contactInfo = document.querySelector('.contact-sect');

listBooks.addEventListener('click', () => {
  bookList.style.display = 'flex';
  addBookSec.style.display = 'none';
  contactInfo.style.display = 'none';
});

showAddBooks.addEventListener('click', () => {
  addBookSec.style.display = 'flex';
  contactInfo.style.display = 'none';
  bookList.style.display = 'none';
});

showContact.addEventListener('click', () => {
  contactInfo.style.display = 'flex';
  bookList.style.display = 'none';
  addBookSec.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', () => {
  bookList.style.display = 'flex';
  addBookSec.style.display = 'none';
  contactInfo.style.display = 'none';
});