import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPost, editPost } from '../../actions'
import Nav from '../Nav'
import PostForm from './PostForm'
import './posts.css'

class EditPostPage extends Component {
  state = {
    postId: null,
    post: null,
    redirect: false
  }
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    // Initial states
    const { post } = this.props
    const { postId } = this.props.match.params
    this.state = {
      ...this.state,
      postId,
      post,
    }
  }
  componentDidMount() {
    this.fetchPost()
  }
  fetchPost() {
    const { postId } = this.state
    const { fetchPost } = this.props
    fetchPost(postId)
      .then((post) => {
        this.setState({ post })
      })
  }
  componentWillReceiveProps(nextProps) {
    const { post } = nextProps
    if (this.state.post !== post) {
      this.setState({
        post
      })
    }
  }
  onChange(e) {
    const { post } = this.state
    post[e.target.name] = e.target.value
    this.setState({ post })
  }
  onSubmit(e) {
    e.preventDefault()

    const { post } = this.state
    const { editPost } = this.props
    editPost(post)
      .then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { categories } = this.props
    const { post, redirect } = this.state
    const currentCategory = (post && post.category && categories) ? categories[post.category] : null

    if (redirect) {
      return <Redirect to={`/${post.category}/${post.id}`} />;
    }
    return (
      <div className='edit-post'>
        {currentCategory &&
          <Nav category={currentCategory} title='Editing post' />
        }
        {post &&
          <PostForm post={post} submitCta='Edit Post' onChange={this.onChange} onSubmit={this.onSubmit} readOnly={['author']} />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ posts, categories }, ownProps) => {
  const { postId } = ownProps.match.params
  const post = posts['all'][postId] || null
  return { categories, post }
}
export default connect(mapStateToProps, { fetchPost, editPost })(EditPostPage)