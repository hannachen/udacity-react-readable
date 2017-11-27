import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import { addPost } from '../../actions'
import NewCategoryNav from '../NewCategoryNav'
import PostForm from './PostForm'
import ArrowIcon from 'react-icons/lib/md/reply'
import './posts.css'

class AddPostPage extends Component {
  state = {
    post: {
      id: '',
      title: '',
      body: '',
      author: '',
      category: '',
    },
    redirect: false,
    redirectTarget: null
  }
  constructor(props, context) {
    super(props, context)

    this.handleBrowserHistory = this.handleBrowserHistory.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
    this.changePostCategory = this.changePostCategory.bind(this)

    // Set default states
    const { categoryId } = this.props.match.params
    const id = uuid()
    this.state = {
      ...this.state,
      post: {
        ...this.state.post,
        category: categoryId,
        id
      }
    }
  }
  componentWillMount() {
    this.unlisten = this.handleBrowserHistory()
  }
  componentWillUnmount() {
    this.unlisten()
  }
  handleBrowserHistory() {
    const { categories, history } = this.props
    return history.listen(({ state }) => {
      if (categories) {
        const category = state || ''
        this.changePostCategory(category)
      }
    })
  }
  onChange(e) {
    const { post } = this.state
    post[e.target.name] = e.target.value
    this.setState({ post })
  }
  onSubmit(e) {
    e.preventDefault()

    const { post } = this.state
    const timestamp = { timestamp: Date.now() }
    const data = Object.assign({}, post, timestamp)

    const { addPost } = this.props
    addPost(data)
      .then((post) => {
        this.setState({
          redirect: true,
          redirectTarget: `/${post.category}/${post.id}`
        })
      })
  }
  selectCategory(category) {
    this.changePostCategory(category)

    const { history } = this.props
    history.push(`/newPost/${category}`, category)
  }
  changePostCategory(category) {
    const { post } = this.state
    this.setState({
      post: {
        ...post,
        category
      }
    })
  }

  render() {
    const { post, redirect, redirectTarget } = this.state
    if (redirect) {
      return <Redirect to={redirectTarget} />
    }

    const { categories } = this.props
    const currentCategory = categories[post.category] || null

    return (
      <div className='add-post'>
        <NewCategoryNav categories={categories} category={currentCategory} onCategorySelect={this.selectCategory} />
        <div className='new-post'>
          {currentCategory ? (
            <PostForm post={post} submitCta='Add Post' onChange={this.onChange} onSubmit={this.onSubmit} />
          ) : (
            <p className='no-category'>
              <ArrowIcon size={32} />
              Please begin by selecting a category
            </p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories }
}

export default connect(mapStateToProps, { addPost })(withRouter(AddPostPage))