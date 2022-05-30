/* eslint-disable eqeqeq */
import Books from './modules/books.js';
import luxon from './modules/luxon.js';

const bookList = document.querySelector('.bookList');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const timeShow = document.querySelector('.show-time');
const formAbook = document.querySelector('#book-form');
const dateTime = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_FULL);
timeShow.textContent = dateTime;
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
              <p><button class="rmv-btn" data-id=${book.id} type="button" title="Delete Book"><i class="fa fa-2x fa-trash"></i></button></p>
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
formAbook.addEventListener('submit', (e) => {
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
const btnClose = document.querySelector('.menu-close');
const btnMenu = document.querySelector('.menu-bar');
const navlist = document.querySelector('.nav-list');
const navItems = document.querySelectorAll('.nav-item');
// Menu Close Event

//  List the books in the
listBooks.addEventListener('click', () => {
  bookList.style.display = 'flex';
  addBookSec.style.display = 'none';
  contactInfo.style.display = 'none';
});
// Add books
showAddBooks.addEventListener('click', () => {
  addBookSec.style.display = 'flex';
  contactInfo.style.display = 'none';
  bookList.style.display = 'none';
});
// Show cntact info
showContact.addEventListener('click', () => {
  contactInfo.style.display = 'flex';
  bookList.style.display = 'none';
  addBookSec.style.display = 'none';
});
// Load list of books on window load
window.addEventListener('DOMContentLoaded', () => {
  bookList.style.display = 'flex';
  addBookSec.style.display = 'none';
  contactInfo.style.display = 'none';
});

const toggleMenu = () => {
  if (navlist.classList.contains('show-menu')) {
    navlist.classList.remove('show-menu');
    btnMenu.style.display = 'flex';
    btnClose.style.display = 'none';
    navlist.style.display = 'none';
  } else {
    navlist.classList.add('show-menu');
    btnMenu.style.display = 'none';
    btnClose.style.display = 'flex';
    navlist.style.display = 'flex';
  }
};

btnClose.addEventListener('click', toggleMenu);
btnMenu.addEventListener('click', toggleMenu);
if (window.innerWidth <= 768) {
  navItems.forEach((navItem) => {
    navItem.addEventListener('click', toggleMenu);
  });
}