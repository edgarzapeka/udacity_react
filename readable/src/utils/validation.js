export function isTitleValid(title){
    return title.match('^[a-zA-Z]{1}.*')
}

export function isBodyValid(body){
    return body.match('^[a-zA-Z]{1}.*')
}

export function isAuthorNameValid(authorName){
    return authorName.match('^[a-zA-Z]{1}.*')
}

export function isCategoryValid(category){
    return ['react', 'redux', 'udacity'].includes(category)
}