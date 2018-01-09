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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Enter Title:</label>
                    <input type="text" className="form-control" name="title" onChange={this.handlePropertyValue}/>
                    {!this.state.validation.isTitleValid && 
                        <small id="emailHelp" class="form-text text-danger">Author Name is invalid</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="title">Enter Body:</label>
                    <textarea className="form-control" rows="3" name="body" onChange={this.handlePropertyValue}></textarea>
                    {!this.state.validation.isBodyValid && 
                        <small id="emailHelp" class="form-text text-danger">Body is invalid</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="title">Enter Author Name:</label>
                    <input type="text" className="form-control" name="authorName" onChange={this.handlePropertyValue}/>
                    {!this.state.validation.isAuthorNameValid && 
                        <small id="emailHelp" class="form-text text-danger">Author Name is invalid</small>
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
                        <small id="emailHelp" class="form-text text-danger">Category is invalid</small>
                    }
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn btn-primary">Cancel</button>
                </div>
            </form>
        ) 
    }
}

function mapStateToProps({categories, posts, comments, modals}){
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