import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postPost, closeAddPostModal } from '../actions/'
import { isTitleValid, isBodyValid, isAuthorNameValid, isCategoryValid } from '../utils/validation'
import uuidv1 from 'uuid' 

class AddPost extends Component{

    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePropertyValue = this.handlePropertyValue.bind(this)
    }

    state = {
        title: '',
        body: '',
        category: '',
        authorName: '',
        validation: {
            isTitleValid: true,
            isBodyValid: true,
            isAuthorNameValid: true,
            isCategoryValid: true
        }
    }

    handlePropertyValue(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const {title, body, category, authorName} = this.state

        if (isTitleValid(title) && isBodyValid(body) && isAuthorNameValid(authorName) && isCategoryValid(category)){
            this.props.createPost({
                id: uuidv1(),
                timestamp: Date.now(),
                title: title,
                body: body,
                author: authorName,
                category: category,
                deleted: false,
                voteScore: 1
            })
    
            this.props.closeModal()
        } else{
            this.setState({
                validation: {
                isTitleValid: isTitleValid(title),
                isBodyValid: isBodyValid(body),
                isAuthorNameValid: isAuthorNameValid(authorName),
                isCategoryValid: isCategoryValid(category)
                }
            })
        }
    }

    invalidFormMessage(text){
        return (
            <small id="emailHelp" className="form-text text-danger">{text}</small>
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Enter Title:</label>
                    <input type="text" className="form-control" name="title" onChange={this.handlePropertyValue}/>
                    {!this.state.validation.isTitleValid && 
                        this.invalidFormMessage("Author Name is invalid")
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="title">Enter Body:</label>
                    <textarea className="form-control" rows="3" name="body" onChange={this.handlePropertyValue}></textarea>
                    {!this.state.validation.isBodyValid && 
                        this.invalidFormMessage("Body is invalid")
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="title">Enter Author Name:</label>
                    <input type="text" className="form-control" name="authorName" onChange={this.handlePropertyValue}/>
                    {!this.state.validation.isAuthorNameValid && 
                        this.invalidFormMessage("Author Name is invalid")
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Category:</label>
                    <select className="form-control" name="category" onChange={this.handlePropertyValue}>
                        <option selected value=""></option>
                        {this.props.categories.map( (c) => {
                            return <option key={c} value={c}>{c}</option>
                        } )}
                    </select>
                    {!this.state.validation.isCategoryValid && 
                        this.invalidFormMessage("Category is invalid")
                    }
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn btn-primary" onClick={this.props.closeModal}>Cancel</button>
                </div>
            </form>
        ) 
    }
}

function mapStateToProps({categories, modals}){
    return {
      categories: categories,
      modals: modals
    }
}

function mapDispatchToProps(dispatch){
    return {
        createPost: (data) => dispatch(postPost(data)),
        closeModal: () =>  dispatch(closeAddPostModal())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPost)