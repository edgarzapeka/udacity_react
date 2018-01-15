import {
    getCategories, 
    getPosts, 
    addPost as addPostAPI,
    editPost as editPostAPI, 
    deletePost as deletePostAPI,
    votePost as votePostAPI ,
    getPostComments as getPostCommentsAPI ,
    addComment as addCommentAPI,
    voteComment as voteCommentAPI,
    deleteComment as deleteCommentAPI,
    editComment as editCommentAPI,
    getPost as getPostAPI
} from '../utils/api'

export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const INIT_CATEGORIES = 'INIT_CATEGORIES'
export const INIT_POSTS = 'INIT_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const SHOW_ADD_POST_MODAL = 'SHOW_ADD_POST_MODAL'
export const HIDE_ADD_POST_MODAL = 'HIDE_ADD_POST_MODAL'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const SHOW_EDIT_POST_MODAL = 'SHOW_EDIT_POST_MODAL'
export const HIDE_EDIT_POST_MODAL = 'HIDE_EDIT_POST_MODAL'
export const SHOW_EDIT_COMMENT_MODAL = 'SHOW_EDIT_COMMENT_MODAL'
export const HIDE_EDIT_COMMENT_MODAL = 'HIDE_EDIT_COMMENT_MODAL'
export const FETCH_ONE_POST = 'FETCH_ONE_POST'

export function fetchCategories(){
    return (dispatch) => getCategories()
        .then(response => response.json())
        .then(json => dispatch(receiveCategories(json.categories)))
}

function receiveCategories(categories){
    return {
        categories: categories.map(c => c.name),
        type: INIT_CATEGORIES
    }
}

export function fetchPosts(){
    return (dispatch) => getPosts()
        .then(response => response.json())
        .then(json => dispatch(receivePosts(json)))
}

export function fetchOnePost(id){
    return (dispatch) => getPostAPI(id)
        .then(response => response.json())
        .then(json => dispatch({
            type: FETCH_ONE_POST,
            post: json
        }))
}

function receivePosts(posts){
    return {
        type: INIT_POSTS,
        posts: posts
    }
}

export const postPost = post => dispatch => (
    addPostAPI(post).then((response) => dispatch(addPost(post)))
)

const addPost = post => {
    return {
        type: ADD_POST,
        post: post
    }
}

export const openAddPostModal = () => {
    return {
        type: SHOW_ADD_POST_MODAL
    }
}

export const closeAddPostModal = () => {
    return {
        type: HIDE_ADD_POST_MODAL
    }
}

export function editPost(id, data){
    return (dispatch) => editPostAPI(id, data).then(response => dispatch({
        type: EDIT_POST,
        id: id,
        title: data.title,
        body: data.body
    }))
}

export function deletePost(id){
    return (dispatch) => deletePostAPI(id).then(response => dispatch({
        type: DELETE_POST,
        id: id
    }))
}

export function votePost(id, voteType){
    return (dispatch) => votePostAPI(id, voteType).then(response => dispatch({
        type: (voteType === 'upVote' ? UPVOTE_POST : DOWNVOTE_POST),
        id: id
    }))
}

function receiveComments(comments){
    return {
        type: FETCH_COMMENT,
        comments: comments
    }
}

export function fetchComments(id){
    return (dispatch) => getPostCommentsAPI(id).then(response => response.json()).then(json => dispatch(receiveComments(json)))
}

function addCommentReducer(comment){
    return {
        type: ADD_COMMENT,
        comment: comment
    }
}

export function addComment(comment){
    return (dispatch) => addCommentAPI(comment).then(response => dispatch(addCommentReducer(comment)))
}

export function editComment(id, data){
    return (dispatch) => editCommentAPI(id, data).then(response => dispatch(editCommentReducer(id, data)))
}

function editCommentReducer(id, data){
    return {
        type: EDIT_COMMENT,
        id: id,
        timestamp: data.timestamp,
        body: data.body
    }
}

export function voteComment(id, voteType){
    return (dispatch) => voteCommentAPI(id, voteType).then(response => dispatch({
        type: (voteType === 'upVote' ? UPVOTE_COMMENT : DOWNVOTE_COMMENT),
        id: id
    }))
}

export function deleteComment(id){
    return (dispatch) => deleteCommentAPI(id).then(response => dispatch({
        type: DELETE_COMMENT,
        id: id
    }))
}

export function openEditPostModal(id){
    return {
        type: SHOW_EDIT_POST_MODAL,
        id: id
    }
}

export function closeEditPostModal(){
    return {
        type: HIDE_EDIT_POST_MODAL
    }
}

export function openEditCommentModal(id){
    return {
        type: SHOW_EDIT_COMMENT_MODAL,
        id: id
    }
}

export function closeEditCommentModal(){
    return {
        type: HIDE_EDIT_COMMENT_MODAL
    }
}