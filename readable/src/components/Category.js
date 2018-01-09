import React, { Component } from 'react'
import {connect} from 'react-redux'
import { deletePost, votePost } from '../actions/'
import Post from './Post'
import {sortByDate, sortByVoteScore} from '../utils/sorts'

class Category extends Component{

    state = {
        sortOrder: 'date'
    }

    render(){
        this.state.sortOrder === 'date' ? this.props.posts.sort(sortByDate) :  this.props.posts.sort(sortByVoteScore)

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row justify-content-between">
                        <div className="col-md-auto sdropdown align-self-end mb-5">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sorted by {this.state.sortOrder}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item" type="button" onClick={() => this.setState({sortOrder: 'date'})}>Sort by date</button>
                                <button className="dropdown-item" type="button" onClick={() => this.setState({sortOrder: 'vote score'})}>Sort by vote score</button>
                            </div>
                        </div>
                        <h1>#{this.props.title}</h1>
                    </div>
                    {this.props.posts.map(post => {
                        return (
                         <Post id={post.id} key={post.id}/>
                        )
                    })}
                    {this.props.posts.length === 0 &&
                        <div className="row justify-content-md-center">
                            <h2 >No Posts Yet</h2>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        posts : state.posts.filter(p => ownProps.title === p.category)
    }
}

function mapDispatchToProps(dispatch){
    return{
        deletePost: (id) => dispatch(deletePost(id)),
        votePost: (id, voteType) => dispatch(votePost(id, voteType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)