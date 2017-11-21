import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import { addComment } from '../../actions'
import api from '../../utils/api'
import CommentForm from "./CommentForm";

class AddCommentPage extends Component {
  state = {
    postId: null,
    comment: {
      id: '',
      timestamp: null,
      body: '',
      author: '',
      parentId: '',
    },
    redirect: false
  }
  constructor(props, context) {
    super(props, context)

    // Set default states
    const { postId } = props
    const id = uuid()
    this.state = {
      ...this.state,
      postId,
      comment: {
        ...this.state.comment,
        parentId: postId,
        id
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { posts } = this.props
    const { comment } = this.state
    return nextProps.posts !== posts || nextState !== comment
  }
  onChange(e) {
    const { comment } = this.state
    comment[e.target.name] = e.target.value
    this.setState({ comment })
  }
  onSubmit(e) {
    e.preventDefault()

    const timestamp = Date.now()
    const { comment } = this.state
    const data = {
      ...comment,
      timestamp
    }

    const { newComment, onSuccess } = this.props
    api.addComment(data)
      .then(newComment)
      .then(() => {
        this.setState({ redirect: true })
        onSuccess()
      })
  }

  render() {
    const { comment } = this.state

    return (
      <div className='add-comment'>
        <div className='new-comment'>
          <CommentForm comment={comment} submitCta='Add Comment' onChange={this.onChange} onSubmit={this.onSubmit} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    newComment: (data) => dispatch(addComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCommentPage)