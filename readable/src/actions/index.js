import * as API from '../utils/api'
import * as Type from './types'

export function fetchCategories(){
    return (dispatch) => API.getCategories()
        .then(response => response.json())
        .then(json => dispatch(receiveCategories(json.categories)))
}

function receiveCategories(categories){
    return {
        categories: categories.map(c => c.name),
        type: Type.INIT_CATEGORIES
    }
}

export function fetchPosts(){
    return (dispatch) => API.getPosts()
        .then(response => response.json())
        .then(json => dispatch(receivePosts(json)))
}

export function fetchOnePost(id){
    return (dispatch) => API.getPost(id)
        .then(response => response.json())
        .then(json => dispatch(
        {
            type: Type.FETCH_ONE_POST,
            post: json 
        }))
}

function receivePosts(posts){
    return {
        type: Type.INIT_POSTS,
        posts: posts
    }
}

export const postPost = post => dispatch => (
    API.addPost(post).then((response) => dispatch(addPost(post)))
)

const addPost = post => {
    return {
        type: Type.ADD_POST,
        post: post
    }
}

export const openAddPostModal = () => {
    return {
        type: Type.SHOW_ADD_POST_MODAL
    }
}

export const closeAddPostModal = () => {
    return {
        type: Type.HIDE_ADD_POST_MODAL
    }
}

export function editPost(id, data){
    return (dispatch) => API.editPost(id, data).then(response => dispatch({
        type: Type.EDIT_POST,
        id: id,
        title: data.title,
        body: data.body
    }))
}

export function deletePost(id){
    return (dispatch) => API.deletePost(id).then(response => dispatch({
        type: Type.DELETE_POST,
        id: id
    }))
}

export function votePost(id, voteType){
    return (dispatch) => API.votePost(id, voteType).then(response => dispatch({
        type: (voteType === 'upVote' ? Type.UPVOTE_POST : Type.DOWNVOTE_POST),
        id: id
    }))
}

function receiveComments(comments){
    return {
        type: Type.FETCH_COMMENT,
        comments: comments
    }
}

export function fetchComments(id){
    return (dispatch) => API.getPostComments(id).then(response => response.json()).then(json => dispatch(receiveComments(json)))
}

function addCommentReducer(comment){
    return {
        type: Type.ADD_COMMENT,
        comment: comment
    }
}

export function addComment(comment, id){
    return (dispatch) => API.addComment(comment).then(response => 
        {
            dispatch(addCommentReducer(comment))
            dispatch({
                type: Type.INCREASE_COMMENT_COUNT,
                id: id
            })
    })
}

export function editComment(id, data){
    return (dispatch) => API.editComment(id, data).then(response => dispatch(editCommentReducer(id, data)))
}

function editCommentReducer(id, data){
    return {
        type: Type.EDIT_COMMENT,
        id: id,
        timestamp: data.timestamp,
        body: data.body
    }
}

export function voteComment(id, voteType){
    return (dispatch) => API.voteComment(id, voteType).then(response => dispatch({
        type: (voteType === 'upVote' ? Type.UPVOTE_COMMENT : Type.DOWNVOTE_COMMENT),
        id: id
    }))
}

export function deleteComment(id, postId){
    return (dispatch) => API.deleteComment(id).then(response => 
        {
        dispatch({
            type: Type.DELETE_COMMENT,
            id: id
            })
        dispatch({
            type: Type.DECREASE_COMMENT_COUNT,
            id: postId
        })
    })
}

export function openEditPostModal(id){
    return {
        type: Type.SHOW_EDIT_POST_MODAL,
        id: id
    }
}

export function closeEditPostModal(){
    return {
        type: Type.HIDE_EDIT_POST_MODAL
    }
}

export function openEditCommentModal(id){
    return {
        type: Type.SHOW_EDIT_COMMENT_MODAL,
        id: id
    }
}

export function closeEditCommentModal(){
    return {
        type: Type.HIDE_EDIT_COMMENT_MODAL
    }
}