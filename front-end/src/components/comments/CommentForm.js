import React, { Component } from 'react'

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
        <h3 className='subheader'>
          Edit Comment
        </h3>
        <button onClick={onClose}>Close form</button>
        <form>
          <input name='author' readOnly={true} value={comment.author} />
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