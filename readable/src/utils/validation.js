export function isTitleValid(title){
    return title.match('^[a-z]{1}.*')
}

export function isBodyValid(body){
    return body.match('^[a-z]{1}.*')
}

export function isAuthorNameValid(authorName){
    return authorName.match('^[a-z]{1}.*')
}

export function isCategoryValid(category){
    return ['react', 'redux', 'udacity'].includes(category)
}