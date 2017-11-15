import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component{
    state = {
      query: '',
      data: []
    }

    updateQuery = (query) => {
      this.setState(state => ({query: query.trim()}))
      BooksAPI.search(query).then(data => {
        this.setState({
          data: Array.isArray(data) ? data : new Array()
        })
      })
    }

    render(){
        const searchResult = this.state.data;
        return (
             <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={event => this.updateQuery(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchResult.length > 0 ? (
                  searchResult.map(book => {
                  book.shelf = this.props.getTheShelf(book); 
                  return <li key={book.id}><Book book={book} onBookChangeShelf={this.props.onBookChangeShelf}/></li>
                })
                ) : (
                  <h1>No results</h1>
                )}
              </ol>
            </div>
        </div>
        )
    }
}

export default SearchBooks