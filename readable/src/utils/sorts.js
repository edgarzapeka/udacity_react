export function sortByDate(b, a){
    if (a.timestamp < b.timestamp)
        return -1;
    if (a.timestamp > b.timestamp)
        return 1;
    return 0;
}

export function sortByVoteScore(b, a){
    if (a.voteScore < b.voteScore)
        return -1;
    if (a.voteScore > b.voteScore)
        return 1;
    return 0;
}