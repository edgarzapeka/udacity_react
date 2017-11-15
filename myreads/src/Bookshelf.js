import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component{
    render(){
        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.map((object) => {
                    return <li key={object.id}><Book book={object} onBookChangeShelf={this.props.onBookChangeShelf}/></li>
                  })}
                </ol>
              </div>
            </div>
        )
    }
}

export default Bookshelf