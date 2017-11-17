import React, { Component } from 'react'
import CloseIcon from 'react-icons/lib/go/x'

class CommentForm extends Component {
  state = {
    showForm: false,
  }
  constructor(props, context) {
    super(props, context)
    this.toggleForm = this.toggleForm.bind(this)
  }
  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  render() {
    const { comment, onChange, onSubmit, onClose } = this.props

    return (
      <div className='comment-form'>
        <h4 className='subheader'>
          <span>Edit Comment</span>
          <button className='icon-btn' onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </h4>
        <form>
          <input name='author' readOnly={true} value={`By: ${comment.author}`} />
          <textarea name='body' onChange={onChange} value={comment.body} />
          <button
            className='icon-btn'
            onClick={onSubmit}>
            Edit Comment
          </button>
        </form>
      </div>
    )
  }
}

export default CommentForm