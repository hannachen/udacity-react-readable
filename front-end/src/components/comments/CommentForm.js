import React from 'react'

export default function CommentForm ({ comment, submitCta, onChange, onSubmit, readOnly: isReadOnly = [] }) {

  const fields = ['author', 'body']

  const { id, parentId, author, body } = comment

  const readOnly = fields.reduce((fieldResults = [], field) => {
    fieldResults[field] = isReadOnly.includes(field)
    return fieldResults
  }, [])

  return (
    <form className='comment-form'>
      {comment && id &&
        <input
          type='hidden'
          name='id'
          defaultValue={id}
        />
      }
      {comment && parentId &&
        <input
          type='hidden'
          name='parentId'
          defaultValue={parentId}
        />
      }
      <div className='field'>
        <label forhtml='input_author'>Author</label>
        <input
          id='input_author'
          readOnly={readOnly['author']}
          className='post-input'
          type='text'
          name='author'
          value={author || ''}
          onChange={onChange}
        />
      </div>
      <div className='field'>
        <label forhtml='input_comment'>Comment</label>
        <textarea
          id='input_comment'
          readOnly={readOnly['body']}
          className='post-input'
          type='text'
          name='body'
          value={body || ''}
          onChange={onChange}
        />
      </div>
      <button
        className='submit-btn'
        onClick={onSubmit}>
        {submitCta}
      </button>
    </form>
  )
}