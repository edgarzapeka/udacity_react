import * as Type from '../actions/types'

import { combineReducers } from 'redux'

const modalsInitial = {
    addPostModalOpen: false,
    editPostModalOpen: false,
    editCommentModalOpen: false,
    activeElementID: null
}

function modals(state = modalsInitial, action){
    switch(action.type){
        case Type.SHOW_ADD_POST_MODAL:
            return {
                ...state,
                addPostModalOpen: true
            }
        case Type.HIDE_ADD_POST_MODAL:
            return {
                ...state,
                addPostModalOpen: false
            }
        case Type.SHOW_EDIT_POST_MODAL:
            return {
                ...state,
                editPostModalOpen: true,
                activeElementID: action.id
            }
        case Type.HIDE_EDIT_POST_MODAL:
            return {
                ...state,
                editPostModalOpen: false,
                activeElementID: null
            }
        case Type.SHOW_EDIT_COMMENT_MODAL:
            return {
                ...state,
                editCommentModalOpen: true,
                activeElementID: action.id
            }
        case Type.HIDE_EDIT_COMMENT_MODAL:
            return {
                ...state,
                editCommentModalOpen: false,
                activeElementID: null
            }
        default:
            return state
    }
}

function comments(state = [], action){
    switch(action.type){
        case Type.ADD_COMMENT:
            state.push(action.comment)
            return state.slice()
        case Type.EDIT_COMMENT:
            return state.map((comment) => ({ ...comment, body: (comment.id === action.id ? action.body : comment.body), timestamp: (comment.id === action.id ? action.timestamp : comment.timestamp)  }))
        case Type.DELETE_COMMENT:
            return state.filter(c => c.id !== action.id)
        case Type.UPVOTE_COMMENT:
            return state.map((comment) => ({ ...comment, voteScore: (comment.id === action.id ? ++comment.voteScore : comment.voteScore) }))
        case Type.DOWNVOTE_COMMENT:
            return state.map((comment) => ({ ...comment, voteScore: (comment.id === action.id ? --comment.voteScore : comment.voteScore) }))
        case Type.FETCH_COMMENT:
            return action.comments
        default:
            return state
    }
}

function categories(state = [], action){
    switch(action.type){
        case Type.INIT_CATEGORIES:
            return action.categories
        default:
            return state;
    }
}

function posts(state = [], action){
    switch(action.type){
        case Type.INIT_POSTS:
            return action.posts
        case Type.FETCH_ONE_POST:
            return [ ...state, action.post ]
        case Type.ADD_POST:
            return [...state, action.post]
        case Type.EDIT_POST:
        return state.map((p) => ({ ...p, body: (p.id === action.id ? action.body : p.body), title: (p.id === action.id ? action.title : p.title)  }))
        case Type.DELETE_POST:
            return state.filter((post) => post.id !== action.id)
        case Type.UPVOTE_POST:
            return state.map((post) => ({ ...post, voteScore: (post.id === action.id ? ++post.voteScore : post.voteScore) }))
        case Type.DOWNVOTE_POST:
            return state.map((post) => ({ ...post, voteScore: (post.id === action.id ? --post.voteScore : post.voteScore) }))
        case Type.INCREASE_COMMENT_COUNT:
            return state.map((p) => ({ ...p, commentCount: (p.id === action.id ? ++p.commentCount : p.commentCount)  }))
        case Type.DECREASE_COMMENT_COUNT:
            return state.map((p) => ({ ...p, commentCount: (p.id === action.id ? --p.commentCount : p.commentCount)  }))
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts,
    comments,
    modals
})