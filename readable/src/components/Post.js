import React, {Component} from 'react'
import { connect } from 'react-redux'
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye'
import MdComment from 'react-icons/lib/md/comment'
import {Link} from 'react-router-dom'
import {deletePost, votePost, openEditPostModal} from '../actions/'
import { displayCurrentTime } from '../utils/formatter'

class Post extends Component{

    render(){
        const date = new Date(this.props.post.timestamp)

        return (
            <div className="row">
                <div className="col-md-auto">
                    <div className="col-md-12">
                        <MdKeyboardArrowUp size="30" onClick={() => this.props.votePost(this.props.post.id, 'upVote')}/>
                    </div>
                    <div className="col-md-12 text-center">
                        {this.props.post.voteScore}
                    </div>
                    <div className="col-md-12">
                        <MdKeyboardArrowDown size="30" onClick={() => this.props.votePost(this.props.post.id, 'downVote')}/>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <Link to={`/${this.props.post.category}/${this.props.post.id}`}>
                            <h3>{this.props.post.title}</h3>
                        </Link>
                    </div>
                    <div className="row">
                        <p>{this.props.post.body}</p>
                    </div>
                </div>
                <div className="col-md-auto">
                    <div className="col-md-12">
                        <Link to="#">
                            <MdDelete size="30" onClick={() => this.props.deletePost(this.props.post.id)}/>
                        </Link>
                    </div>
                    <div className="col-md-12">
                        <Link to="#">
                            <MdEdit size="30" onClick={() => this.props.openEditPostModal(this.props.post.id)}/>
                        </Link>
                    </div>
                    <div className="col-md-12">
                        <Link to={`/${this.props.post.category}/${this.props.post.id}`}>
                            <MdRemoveRedEye size="30" />
                        </Link>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-auto">
                            <p>{date.getDate()}/{date.getMonth()}/{date.getFullYear()} | {displayCurrentTime(date)}</p>
                        </div>
                        <div className="col-md-auto">
                            <p>by {this.props.post.author}</p>
                        </div>
                        <div className="col-md-auto">
                            <MdComment /> {this.props.post.commentCount}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        post: state.posts.find(p => p.id === ownProps.id)
    }
}

function mapDispatchToProps(dispatch){
    return {
        deletePost: (id) => dispatch(deletePost(id)),
        votePost: (id, voteType) => dispatch(votePost(id, voteType)),
        openEditPostModal: (id) => dispatch(openEditPostModal(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)