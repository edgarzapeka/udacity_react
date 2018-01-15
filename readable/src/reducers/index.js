import { 
    ADD_COMMENT,
    FETCH_COMMENT,
    EDIT_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DELETE_COMMENT,
    INIT_CATEGORIES, 
    INIT_POSTS,
    ADD_POST, 
    EDIT_POST,
    DELETE_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    SHOW_ADD_POST_MODAL, 
    HIDE_ADD_POST_MODAL,
    SHOW_EDIT_POST_MODAL,
    HIDE_EDIT_POST_MODAL,
    SHOW_EDIT_COMMENT_MODAL,
    HIDE_EDIT_COMMENT_MODAL,
    FETCH_ONE_POST 
} from '../actions/'

import { combineReducers } from 'redux'

const modalsInitial = {
    addPostModalOpen: false,
    editPostModalOpen: false,
    editCommentModalOpen: false,
    activeElementID: null
}

function modals(state = modalsInitial, action){
    switch(action.type){
        case SHOW_ADD_POST_MODAL:
            return {
                ...state,
                addPostModalOpen: true
            }
        case HIDE_ADD_POST_MODAL:
            return {
                ...state,
                addPostModalOpen: false
            }
        case SHOW_EDIT_POST_MODAL:
            return {
                ...state,
                editPostModalOpen: true,
                activeElementID: action.id
            }
        case HIDE_EDIT_POST_MODAL:
            return {
                ...state,
                editPostModalOpen: false,
                activeElementID: null
            }
        case SHOW_EDIT_COMMENT_MODAL:
            return {
                ...state,
                editCommentModalOpen: true,
                activeElementID: action.id
            }
        case HIDE_EDIT_COMMENT_MODAL:
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
        case ADD_COMMENT:
            state.push(action.comment)
            return state.slice()
        case EDIT_COMMENT:
            return state.map((comment) => ({ ...comment, body: (comment.id === action.id ? action.body : comment.body), timestamp: (comment.id === action.id ? action.timestamp : comment.timestamp)  }))
        case DELETE_COMMENT:
            return state.filter(c => c.id !== action.id)
        case UPVOTE_COMMENT:
            return state.map((comment) => ({ ...comment, voteScore: (comment.id === action.id ? ++comment.voteScore : comment.voteScore) }))
        case DOWNVOTE_COMMENT:
            return state.map((comment) => ({ ...comment, voteScore: (comment.id === action.id ? --comment.voteScore : comment.voteScore) }))
        case FETCH_COMMENT:
            return action.comments
        default:
            return state
    }
}

function categories(state = [], action){
    switch(action.type){
        case INIT_CATEGORIES:
            return action.categories
        default:
            return state;
    }
}

function posts(state = [], action){
    switch(action.type){
        case INIT_POSTS:
            return action.posts
        case FETCH_ONE_POST:
            return [ ...state, action.post ]
        case ADD_POST:
            return [...state, action.post]
        case EDIT_POST:
        return state.map((p) => ({ ...p, body: (p.id === action.id ? action.body : p.body), title: (p.id === action.id ? action.title : p.title)  }))
        case DELETE_POST:
            return state.filter((post) => post.id !== action.id)
        case UPVOTE_POST:
            return state.map((post) => ({ ...post, voteScore: (post.id === action.id ? ++post.voteScore : post.voteScore) }))
        case DOWNVOTE_POST:
            return state.map((post) => ({ ...post, voteScore: (post.id === action.id ? --post.voteScore : post.voteScore) }))
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