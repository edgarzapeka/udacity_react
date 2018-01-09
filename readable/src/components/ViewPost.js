import React, { Component } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'
import { fetchComments, addComment } from '../actions/index'
import uuidv1 from 'uuid' 
import {sortByDate, sortByVoteScore} from '../utils/sorts'
import { isAuthorNameValid, isBodyValid } from '../utils/validation'

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
            <div className="row">
                <div className="col-md-12">
                    <div className="row justify-content-between">
                        <div className="col-md-2">
                            <h4>Score: {this.props.post.voteScore}</h4>
                        </div>
                        <div className="col-md-4">
                            <h3 className="text-center">{this.props.post.title}</h3>
                        </div>
                        <div className="col-md-2">
                            <h5>{this.props.post.category}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <h5 className="p-4">
                            {this.props.post.body}
                        </h5>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-2">
                         <p>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                        </div>
                        <div className="col-md-2">
                            <p>{this.props.post.author}</p>
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
                        <div className="form-group row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-10">
                                <small class="form-text text-danger">Author Name is invalid</small>
                            </div>
                        </div>
                    }
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Text:</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" rows="3" name="body" value={this.state.body} onChange={this.handlePropertyValue}></textarea>
                        </div>
                    </div>
                    {!this.state.validation.isBodyValid && 
                        <div className="form-group row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-10">
                                <small class="form-text text-danger">Body is invalid</small>
                            </div>
                        </div>
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
        addComment: (comment) => dispatch(addComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)