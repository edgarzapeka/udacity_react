const host = 'http://localhost:3001'
const headers = {
    Accept: 'application/json',
    Authorization: 'whatever-you-want',
    'Content-Type': 'application/json'
  }

export function addPost(post){
    return fetch(`${host}/posts`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(post)
    })
}

export function getCategories(){
    return fetch(`${host}/categories`, {
        method: 'GET',
        headers: headers
    })
}

export function getPosts(category){
    return fetch(`${host}/posts`, {
        method: 'GET',
        headers: headers
    })
}

export function editPost(id, data){
    return fetch(`${host}/posts/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
            title: data.title,
            body: data.body
        })
    })
}

export function deletePost(id){
    return fetch(`${host}/posts/${id}`, {
        method: 'DELETE',
        headers: headers
    })
}

export function votePost(id, voteType){
    return fetch(`${host}/posts/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            option: voteType
        })
    })
}

export function getPostComments(id){
    return fetch(`${host}/posts/${id}/comments`, {
        method: 'GET',
        headers: headers,
    })
}

export function addComment(comment){
    return fetch(`${host}/comments`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(comment)
    })
}

export function editComment(id, data){
    return fetch(`${host}/comments/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
            timestamp: data.timestamp,
            body: data.body
        })
    })
}

export function voteComment(id, voteType){
    return fetch(`${host}/comments/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            option: voteType
        })
    })
}

export function deleteComment(id){
    return fetch(`${host}/comments/${id}`, {
        method: 'DELETE',
        headers: headers
    })
}