import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeEditCommentModal, editComment } from '../actions/'
import { isBodyValid } from '../utils/validation'

class EditComment extends Component {
    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePropertyValue = this.handlePropertyValue.bind(this)
    }

    state = {
        body: this.props.comment.body,
        validation: {
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

        if (isBodyValid(this.state.body)){
            this.props.editComment(this.props.comment.id, {
                timestamp: Date.now(),
                body: this.state.body
            })
            
            this.props.closeEditCommentModal()
        } else{
            this.setState({
                validation: {
                    isBodyValid: isBodyValid(this.state.body)
                }
            })
        }
    }

    invalidFormMessage(text){
        return(
            <div className="form-group-row mb-4">
                <small class="form-text text-danger">{text}</small>
            </div>
        )
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group-row">
                    <label>Author: {this.props.comment.author}</label>
                </div>
                <div className="form-group-row">
                    <label>Rate: {this.props.comment.voteScore}</label>
                </div>
                <div className="form-group-row mb-4">
                    <label >Body:</label>
                    <textarea className="form-control" rows="3" name="body" value={this.state.body} onChange={this.handlePropertyValue}></textarea>
                </div>
                {!this.state.validation.isBodyValid &&
                    this.invalidFormMessage("Body is invalid") 
                }
                <button type="submit" className="btn btn-primary">Save</button>
                <button className="btn btn-primary ml-2" onClick={this.props.closeEditCommentModal}>Cancel</button>
            </form>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        comment: state.comments.find(c => c.id === state.modals.activeElementID)
    }
}

function mapDispatchToProps(dispatch){
    return {
        closeEditCommentModal: () => dispatch(closeEditCommentModal()),
        editComment: (id, data) => dispatch(editComment(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)