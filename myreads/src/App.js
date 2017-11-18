import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    data: []
  }

  componentDidMount = () =>{
    BooksAPI.getAll().then((data) => {
      this.setState({
        data: data
      })
    })
  }

  updateBookShelf = (id, shelfName) => {
    BooksAPI.update(id, shelfName).then((data) => {
      BooksAPI.getAll().then((data) => {
        this.setState({
          data: data
        })
      })
    });
  }

  getTheShelf = (newBook) => {
    for(let i = 0; i < this.state.data.length; i++){
      if (this.state.data[i].title === newBook.title)
        return this.state.data[i].shelf
    }

    return null;
  }

  render() {
    const currentlyReading = this.state.data.filter(book => book.shelf === 'currentlyReading' );
    const wantToRead = this.state.data.filter(book => book.shelf === 'wantToRead' );
    const read = this.state.data.filter(book => book.shelf === 'read' );

    return (
      <div className="app">
      <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf books={currentlyReading} title="Currently Reading" onBookChangeShelf={this.updateBookShelf} />
                <Bookshelf books={wantToRead} title="Want To Read" onBookChangeShelf={this.updateBookShelf} />
                <Bookshelf books={read} title="Read" onBookChangeShelf={this.updateBookShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
        
      </div>
      )} />
      <Route path="/search" render={() => (
        <SearchBooks getTheShelf={this.getTheShelf} onBookChangeShelf={this.updateBookShelf} />
      )}/>
      </div>
    )
  }
}

export default BooksApp
