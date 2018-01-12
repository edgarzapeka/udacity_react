import React, {Component} from 'react'
import { connect } from 'react-redux'
import { closeEditPostModal, editPost } from '../actions/'
import { isTitleValid, isBodyValid } from '../utils/validation'

class EditPost extends Component{

    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePropertyValue = this.handlePropertyValue.bind(this)
    }

    state = {
        title: this.props.post.title,
        body: this.props.post.body,
        validation:{
            isTitleValid: true,
            isBodyValid: true
        }
    }

    handlePropertyValue(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const {title, body} = this.state

        if (isTitleValid(title) && isBodyValid(body)){
            this.props.editPost(this.props.post.id, {
                title: this.state.title,
                body: this.state.body
            })
            
            this.props.closeEditPostModal()
        } else{
            this.setState({
                validation: {
                    isTitleValid: isTitleValid(title),
                    isBodyValid: isBodyValid(body)
                }
            })
        }
    }

    invalidFormMessage(text){
        return (
            <small id="emailHelp" class="form-text text-danger">{text}</small>
        )
    }

    render(){
        const date = new Date(this.props.post.timestamp)
        const dateValue = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Enter Title:</label>
                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handlePropertyValue}/>
                    {!this.state.validation.isTitleValid && 
                        this.invalidFormMessage("Author Name is invalid")
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="title">Enter Body:</label>
                    <textarea className="form-control" rows="3" name="body" value={this.state.body} onChange={this.handlePropertyValue}></textarea>
                    {!this.state.validation.isBodyValid && 
                        this.invalidFormMessage("Body is invalid")
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="title">Enter Author Name:</label>
                    <input type="text" className="form-control" name="authorName" disabled value={this.props.post.author}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Category:</label>
                    <input type="text" className="form-control" name="category" disabled value={this.props.post.category}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Date:</label>
                    <input type="text" className="form-control" name="date" disabled value={dateValue}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn btn-primary ml-2" onClick={this.props.closeEditPostModal}>Cancel</button>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state){
    return {
        post: state.posts.find(p => p.id === state.modals.activeElementID)
    }
}

function mapDispatchToProps(dispatch){
    return {
        closeEditPostModal: () => dispatch(closeEditPostModal()),
        editPost: (id, data) => dispatch(editPost(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)