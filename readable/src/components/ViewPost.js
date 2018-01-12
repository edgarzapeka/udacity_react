import React, { Component } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'
import { fetchComments, addComment, votePost, openEditPostModal, deletePost } from '../actions/index'
import uuidv1 from 'uuid' 
import {sortByDate, sortByVoteScore} from '../utils/sorts'
import { isAuthorNameValid, isBodyValid } from '../utils/validation'
import {Link} from 'react-router-dom'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import MdThumbUp from 'react-icons/lib/md/thumb-up'
import MdThumbDown from 'react-icons/lib/md/thumb-down'

class ViewPost extends Component{

    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePropertyValue = this.handlePropertyValue.bind(this)
    }

    state = {
        authorName: '',
        body: '',
        sortOrder: 'date',
        validation: {
            isAuthorNameValid: true,
            isBodyValid: true
        }
    }

    componentDidMount(){
        if (this.props.post !== undefined){
            this.props.fetchComments(this.props.post.id)
        }
    }

    componentDidUpdate(){
        if (this.props.post !== undefined && this.props.comments.length === 0){
            this.props.fetchComments(this.props.post.id)
        }
    }

    handlePropertyValue(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const { authorName, body } = this.state

        if (isAuthorNameValid(authorName) && isBodyValid(body)){
            this.props.addComment({
                id: uuidv1(),
                timestamp: Date.now(),
                body: this.state.body,
                author: this.state.authorName,
                parentId: this.props.post.id,
                voteScore: 1
            })
    
            this.setState( (state, props) => ({
                authorName: '',
                body: ''
                }) 
            )
        } else{
            this.setState({
                validation: {
                    isAuthorNameValid: isAuthorNameValid(authorName),
                    isBodyValid: isBodyValid(body)
                }
            })
        }
    }

    invalidFormMessage(text){
        return (
            <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <small class="form-text text-danger">{text}</small>
                </div>
            </div>
        )
    }

    render(){
        
        if (this.props.post === undefined){
            return (
                <h1>Ooops</h1> 
                // I would very appreciate if you could give me a better soulution than this hack. 
                // I did it in order to avoid an arror that appear when you bookmark url for a post and then go the website.
                // It somehow doesn't load a state on App.js page, but it works for Category.js component
                // Very confused
            )
        }
        
        const date = new Date(this.props.post.timestamp)
        this.state.sortOrder === 'date' ? this.props.comments.sort(sortByDate) :  this.props.comments.sort(sortByVoteScore)

        return (
            <div className="row p-4">
              <div className="col-md-12">
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <h3 className="text-center">{this.props.post.title}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="p-5">
                                {this.props.post.body}
                            </h5>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-auto">
                            <Link to="#">
                                <MdThumbUp size="30" onClick={() => this.props.votePost(this.props.post.id, 'upVote')}/>
                            </Link>
                                <span className="mx-4">{this.props.post.voteScore}</span>
                            <Link to="#">
                                <MdThumbDown size="30" onClick={() => this.props.votePost(this.props.post.id, 'downVote')}/>
                            </Link>
                        </div>
                        <div className="col-md-auto">
                            <Link to="#">
                                <MdDelete size="30" onClick={() => this.props.deletePost(this.props.post.id)}/>
                            </Link>
                            <Link to="#">
                                <MdEdit size="30" onClick={() => this.props.openEditPostModal(this.props.post.id)}/>
                            </Link>
                        </div>
                        <div className="col-md-auto">
                            <p>Date: <strong>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</strong> | Author: <strong>{this.props.post.author}</strong> | Comments Number: <strong>{this.props.post.commentCount}</strong> | Category: <strong>{this.props.post.category}</strong></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                </div>
                <div className="col-md-12">
                <hr />
                    <div className="row justify-content-md-center">
                        <h3 >Comments:</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-auto sdropdown align-self-end mb-5">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sorted by {this.state.sortOrder}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item" type="button" onClick={() => this.setState({sortOrder: 'date'})}>Sort by date</button>
                                <button className="dropdown-item" type="button" onClick={() => this.setState({sortOrder: 'vote score'})}>Sort by vote score</button>
                            </div>
                        </div>
                    </div>
                    {this.props.comments.map( c => (
                        <Comment id={c.id} key={c.id}/>
                    ))}
                     {this.props.comments.length === 0 &&
                        <div className="row justify-content-md-center">
                            <h2 >No Comments Yet</h2>
                        </div>
                    }
                </div>
                <div className="col-md-12 mb-4">
                <hr />
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Author Name:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="authorName" value={this.state.authorName} onChange={this.handlePropertyValue}/>
                        </div>
                    </div>
                    {!this.state.validation.isAuthorNameValid && 
                        this.invalidFormMessage("Author Name is invalid")
                    }
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Text:</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" rows="3" name="body" value={this.state.body} onChange={this.handlePropertyValue}></textarea>
                        </div>
                    </div>
                    {!this.state.validation.isBodyValid && 
                        this.invalidFormMessage("Body is invalid")
                    }
                    <button className="btn btn-primary" type="submit">Send comment</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        post: state.posts.find( p => p.id === ownProps.id ),
        comments: state.comments.filter( c => c.parentId === ownProps.id )
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchComments: (id) => dispatch(fetchComments(id)),
        addComment: (comment) => dispatch(addComment(comment)),
        votePost: (id, voteType) => dispatch(votePost(id, voteType)),
        openEditPostModal: (id) => dispatch(openEditPostModal(id)),
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)