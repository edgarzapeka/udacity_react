import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteComment, deleteComment, openEditCommentModal } from '../actions/'
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import { displayCurrentTime } from '../utils/formatter'
import { Link } from 'react-router-dom'

class Comment extends Component{

    render(){
        const date = new Date(this.props.comment.timestamp)

        return (
            <div className="row justify-content-end">
                <div className="col-md-auto">
                    <div className="col-md-12">
                        <MdKeyboardArrowUp size="30" onClick={() => this.props.voteComment(this.props.comment.id, 'upVote')}/>
                    </div>
                    <div className="col-md-12 text-center">
                        {this.props.comment.voteScore}
                    </div>
                    <div className="col-md-12">
                        <MdKeyboardArrowDown size="30" onClick={() => this.props.voteComment(this.props.comment.id, 'downVote')}/>
                    </div>
                </div>
                <div className="col-md-10">
                    <h5>
                        {this.props.comment.body}
                    </h5>
                </div>
                <div className="col-md-auto">
                    <div className="col-md-12">
                        <Link to="#">
                            <MdDelete size="30" onClick={() => this.props.deleteComment(this.props.comment.id)}/>
                        </Link>
                    </div>
                    <div className="col-md-12">
                        <Link to="#">
                            <MdEdit size="30" onClick={() => this.props.openCommentEditModal(this.props.comment.id)}/>
                        </Link>
                    </div>
                </div>
                <div className="col-md-auto">
                <p>{date.getDate()}/{date.getMonth()}/{date.getFullYear()} | {displayCurrentTime(date)} by <strong>{this.props.comment.author}</strong></p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        comment: state.comments.find(c => c.id === ownProps.id)
    }
}

function mapDispatchToProps(dispatch){
    return {
        voteComment: (id, voteType) => dispatch(voteComment(id, voteType)),
        deleteComment: (id) => dispatch(deleteComment(id)),
        openCommentEditModal: (id) => dispatch(openEditCommentModal(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)