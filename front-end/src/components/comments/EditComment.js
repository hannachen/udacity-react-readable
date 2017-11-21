import React, { Component } from 'react'
import CommentForm from './CommentForm'
import CloseIcon from 'react-icons/lib/go/x'

class EditComment extends Component {
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
      <div className='edit-comment'>
        <h4 className='subheader'>
          <span>Edit Comment</span>
          <button className='icon-btn' onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </h4>
        <CommentForm
          comment={comment}
          submitCta='Edit Comment'
          onChange={onChange}
          onSubmit={onSubmit}
          readOnly={['author']} />
      </div>
    )
  }
}

export default EditComment