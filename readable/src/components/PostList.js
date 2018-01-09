import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import {sortByDate, sortByVoteScore} from '../utils/sorts'

class PostList extends Component{

    state = {
        sortOrder: 'date'
    }

    render(){
        this.state.sortOrder === 'date' ? this.props.posts.sort(sortByDate) :  this.props.posts.sort(sortByVoteScore)

        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-auto sdropdown align-self-end mb-5">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sorted by {this.state.sortOrder}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" onClick={() => this.setState({sortOrder: 'date'})}>Sort by date</button>
                            <button className="dropdown-item" type="button" onClick={() => this.setState({sortOrder: 'vote score'})}>Sort by vote score</button>
                        </div>
                    </div>
                </div>
                {this.props.posts.map((p) => (
                    <Post id={p.id} key={p.id}/>
                ))}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(PostList)