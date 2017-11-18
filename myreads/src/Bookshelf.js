import React from 'react'
import Book from './Book'

function Bookshelf(props) {
  const { title, books, onBookChangeShelf } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((object) => {
            return (
              <li key={object.id}><Book book={object} onBookChangeShelf={onBookChangeShelf}/></li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf