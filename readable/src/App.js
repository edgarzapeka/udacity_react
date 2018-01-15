import React, { Component } from 'react';
import './App.css';
import Category from './components/Category'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { 
  fetchCategories, 
  openAddPostModal, 
  closeAddPostModal, 
  fetchPosts,
  closeEditPostModal,
  closeEditCommentModal 
} from './actions/'
import Modal from 'react-modal'
import AddPost from './components/AddPost'
import ViewPost from './components/ViewPost'
import EditPost from './components/EditPost';
import EditComment from './components/EditComment'
import PostList from './components/PostList'

class App extends Component {

  

  state = {
    sortFilter: 'byDate'
  }

  componentDidMount(){
    this.props.fetchCategories()
    this.props.fetchPosts()
    Modal.setAppElement('body');
  }

  render() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return (
      <Router>
        <div className="container">
        <div className="App">
            <header className="App-header">
              <h1 className="App-title">Hello Udacity React !</h1>
            </header>
            <ul className="nav justify-content-center">
              <li className='nav-item'>
              <Link to={`/`} className='nav-link'>
                            Home
              </Link></li>
              {this.props.categories.map((category) => {
                return <li key={category} className='nav-item'>
                          <Link to={`/${category}`} className='nav-link'>
                            {category}
                          </Link>
                        </li>
              })}
              <li className='nav-item'><Link to={`/`} onClick={this.props.openModal} className='nav-link'>Add Post</Link></li>
            </ul>
            <Modal
              isOpen={this.props.modals.addPostModalOpen}
              onRequestClose={this.props.closeModal}
              contentLabel='Modal'
              style={customStyles}>
                <h1>Add New Post</h1>
                <AddPost/>
            </Modal>
            <Modal
            isOpen={this.props.modals.editPostModalOpen}
            onRequestClose={this.props.closeEditPostModal}
            contentLabel='Modal'
            style={customStyles}>
              <h1>Edit Post</h1>
              <EditPost />
            </Modal>
            <Modal
            isOpen={this.props.modals.editCommentModalOpen}
            onRequestClose={this.props.closeEditCommentModal}
            contentLabel='Modal'
            style={customStyles}>
              <h1>Edit Comment</h1>
              <EditComment />
            </Modal>
          </div>
        <Route exact path="/" render={() => (
          <PostList />
        )} />
        <Route  exact path="/:category/:id" render={ ({match}) => (
          <ViewPost id={match.params.id} getPost={this.getPost}/>
        )} />
        <Route exact path="/:categoryName" render={({ match }) => (
          <Category title={match.params.categoryName} />
        )} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
    categories: state.categories,
    modals: state.modals
  }
}

function mapDispatchToProps(dispatch){
  return {
    openModal: () => dispatch(openAddPostModal()),
    closeModal: () => dispatch(closeAddPostModal()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    closeEditPostModal: () => dispatch(closeEditPostModal()),
    closeEditCommentModal: () => dispatch(closeEditCommentModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);