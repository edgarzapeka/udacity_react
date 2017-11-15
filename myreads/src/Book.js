import React from 'react'

class Book extends React.Component{

    change = (e) =>{
      this.props.onBookChangeShelf(this.props.book, e.target.value);
    }

    render(){
      const shelfTypes = [
        {
          value: 'currentlyReading',
          text: 'Currently Reading'
        },
        {
          value: 'wantToRead',
          text: 'Want to read'
        },
        {
          value: 'read',
          text: 'Read'
        },
        {
          value: 'none',
          text: 'None'
        }
      ]
        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.book.imageLinks.thumbnail +')' }}></div>
                <div className="book-shelf-changer">
                  <select onChange={this.change} value={this.props.book.shelf === null ? 'none' : this.props.book.shelf}>
                    <option value="none" disabled>Move to...</option>
                    {shelfTypes.map(value => {
                      return <option value={value.value} > {value.value === this.props.book.shelf? '\u2714  ' + value.text : `${value.text}`} </option>
                    })}
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors.map(author => author)}</div>
            </div>
        )
    }
}

export default Book