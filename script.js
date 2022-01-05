function Book(name, author) {
  this.name = name;
  this.author = author;
}

class Books {
  constructor() {
    this.storage = [];
  }

  add(book) {
    this.storage.push(book);
  }

  remove(index) {
    this.storage.splice(index, 1);
  }

  set setBooks(books) {
    this.storage = books;
  }
}

function saveBooksInLocalStorage(books) {
  localStorage.setItem('bookArray', JSON.stringify(books));
}

function getBooksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('bookArray'));
}

const bookStor = new Books();

function removeBook(remButt) {
  const books = remButt.parentElement.parentElement.children;
  for (let i = 0; i < books.length; i += 1) {
    if (remButt.parentElement === books[i]) {
      bookStor.remove(i);
      saveBooksInLocalStorage(bookStor.storage);
      break;
    }
  }
}

function createHTMLBook(bName, bAuthor) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book', 'd-flex', 'justify-content-between', 'py-2', 'px-3');

  const name = document.createElement('p');
  name.textContent = `"${bName}" by ${bAuthor}`;
  name.classList.add('align-self-center', 'my-1', 'f-20px');
  bookDiv.appendChild(name);

  const remButt = document.createElement('button');
  remButt.textContent = 'Remove';
  remButt.classList.add('remButton', 'border', 'border-2', 'border-dark');
  bookDiv.appendChild(remButt);
  remButt.addEventListener('click', () => {
    removeBook(remButt);
    remButt.parentElement.remove();
  });
  return bookDiv;
}

function setLocalStorage() {
  const localObj = localStorage.getItem('bookArray');
  const bookContainer = document.getElementById('bookContainer');
  for (let i = 0; i < JSON.parse(localObj).length; i += 1) {
    const { name } = JSON.parse(localObj)[i];
    const { author } = JSON.parse(localObj)[i];
    bookContainer.appendChild(createHTMLBook(name, author));
  }
}

function addBook(newBook) {
  bookStor.add(newBook);
  saveBooksInLocalStorage(bookStor.storage);
  const bookContainer = document.getElementById('bookContainer');
  bookContainer.appendChild(createHTMLBook(newBook.name, newBook.author));
}

const addBookbtn = document.getElementById('addBookbtn');
addBookbtn.onclick = function addABook() {
  const name = document.getElementById('addName').value;
  const author = document.getElementById('addAuthor').value;
  if (name !== '' && author !== '') {
    const newBook = new Book(name, author);
    addBook(newBook);
    document.getElementById('addName').value = null;
    document.getElementById('addAuthor').value = null;
  }
};

function checkTime(i) {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
}

function time() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  let tail = '';

  if (day === 1) {
    tail = 'st';
  } else if (day === 2) {
    tail = 'nd';
  } else if (day === 3) {
    tail = 'rd';
  } else {
    tail = 'th';
  }

  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  minute = checkTime(minute);
  second = checkTime(second);

  document.getElementById('time').innerHTML = `${monthArray[month]} ${day}${tail} ${year}, ${hour}:${minute}:${second}`;

  setTimeout(time, 1000);
}

const bookListBtn = document.getElementById('navBookList');
const bookFormBtn = document.getElementById('navBookForm');
const bookContactBtn = document.getElementById('navBookContact');

bookListBtn.addEventListener('click', () => {
  const bookListSection = document.getElementById('bookList');
  const bookFormSection = document.getElementById('addBook');
  const bookContactSection = document.getElementById('contact');

  bookListSection.classList.remove('d-none');
  bookListSection.classList.add('d-flex');

  bookFormSection.classList.remove('d-flex');
  bookFormSection.classList.add('d-none');

  bookContactSection.classList.remove('d-flex');
  bookContactSection.classList.add('d-none');

  bookListBtn.classList.remove('text-black');
  bookListBtn.classList.add('text-primary');

  bookFormBtn.classList.remove('text-primary');
  bookFormBtn.classList.add('text-black');

  bookContactBtn.classList.remove('text-primary');
  bookContactBtn.classList.add('text-black');
});

bookFormBtn.addEventListener('click', () => {
  const bookListSection = document.getElementById('bookList');
  const bookFormSection = document.getElementById('addBook');
  const bookContactSection = document.getElementById('contact');

  bookListSection.classList.remove('d-flex');
  bookListSection.classList.add('d-none');

  bookFormSection.classList.remove('d-none');
  bookFormSection.classList.add('d-flex');

  bookContactSection.classList.remove('d-flex');
  bookContactSection.classList.add('d-none');

  bookListBtn.classList.remove('text-primary');
  bookListBtn.classList.add('text-black');

  bookFormBtn.classList.remove('text-black');
  bookFormBtn.classList.add('text-primary');

  bookContactBtn.classList.remove('text-primary');
  bookContactBtn.classList.add('text-black');
});

bookContactBtn.addEventListener('click', () => {
  const bookListSection = document.getElementById('bookList');
  const bookFormSection = document.getElementById('addBook');
  const bookContactSection = document.getElementById('contact');

  bookListSection.classList.remove('d-flex');
  bookListSection.classList.add('d-none');

  bookFormSection.classList.remove('d-flex');
  bookFormSection.classList.add('d-none');

  bookContactSection.classList.remove('d-none');
  bookContactSection.classList.add('d-flex');

  bookListBtn.classList.remove('text-primary');
  bookListBtn.classList.add('text-black');

  bookFormBtn.classList.remove('text-primary');
  bookFormBtn.classList.add('text-black');

  bookContactBtn.classList.remove('text-black');
  bookContactBtn.classList.add('text-primary');
});

const localObj = localStorage.getItem('bookArray');
if (localObj != null) {
  setLocalStorage();
}

if (localStorage.getItem('bookArray') != null) {
  bookStor.setBooks = getBooksFromLocalStorage();
}

time();