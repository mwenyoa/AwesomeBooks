export default class Books {
  constructor(btitle, bauthor) {
    this.bookAuthor = bauthor;
    this.bookTitle = btitle;
    this.id = Date.now();
  }
}