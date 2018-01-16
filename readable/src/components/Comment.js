import React from 'react'
import { connect } from 'react-redux'
import { voteComment, deleteComment, openEditCommentModal } from '../actions/'
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import { displayCurrentTime } from '../utils/formatter'
import { Link } from 'react-router-dom'

function Comment(props){
    const { body, voteScore, id, author, timestamp } = props.comment
    const date = new Date(timestamp)

    return(
        <div className="row justify-content-end">
            <div className="col-md-auto">
                <div className="col-md-12">
                    <MdKeyboardArrowUp size="30" onClick={() => props.voteComment(id, 'upVote')}/>
                </div>
                <div className="col-md-12 text-center">
                    {voteScore}
                </div>
                <div className="col-md-12">
                    <MdKeyboardArrowDown size="30" onClick={() => props.voteComment(id, 'downVote')}/>
                </div>
            </div>
            <div className="col-md-10">
                <h5>
                    {body}
                </h5>
            </div>
            <div className="col-md-auto">
                <div className="col-md-12">
                    <Link to="#">
                        <MdDelete size="30" onClick={() => props.deleteComment(id, props.postId)}/>
                    </Link>
                </div>
                <div className="col-md-12">
                    <Link to="#">
                        <MdEdit size="30" onClick={() => props.openCommentEditModal(id)}/>
                    </Link>
                </div>
            </div>
            <div className="col-md-auto">
            <p>{date.getDate()}/{date.getMonth()}/{date.getFullYear()} | {displayCurrentTime(date)} by <strong>{author}</strong></p>
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    return {
        comment: state.comments.find(c => c.id === ownProps.id)
    }
}

function mapDispatchToProps(dispatch){
    return {
        voteComment: (id, voteType) => dispatch(voteComment(id, voteType)),
        deleteComment: (id, postId) => dispatch(deleteComment(id, postId)),
        openCommentEditModal: (id) => dispatch(openEditCommentModal(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)