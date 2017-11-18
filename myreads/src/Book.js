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
      ];

      const { id, imageLinks, shelf, title, authors } = this.props.book;

        return (
            <div className="book" key={id}>
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + imageLinks.thumbnail +')' }}></div>
                <div className="book-shelf-changer">
                  <select onChange={this.change} value={shelf === null ? 'none' : shelf}>
                    <option value="none" disabled>Move to...</option>
                    {shelfTypes.map(value => {
                      return <option value={value.value} key={value.value} > {value.value === shelf? '\u2714  ' + value.text : `${value.text}`} </option>
                    })}
                  </select>
                </div>
              </div>
              <div className="book-title">{title}</div>
            <div className="book-authors">{authors.map(author => author)}</div>
            </div>
        )
    }
}

export default Book