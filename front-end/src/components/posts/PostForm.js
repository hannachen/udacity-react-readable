import React  from 'react'

export default function PostForm ({ post, submitCta, onChange, onSubmit, readOnly: isReadOnly = [] }) {

  const fields = ['author', 'title', 'body']

  const { id, author, title, body, category } = post

  const readOnly = fields.reduce((fieldResults = [], field) => {
    fieldResults[field] = isReadOnly.includes(field)
    return fieldResults
  }, [])

  return (
    <form className='post-form' onSubmit={onSubmit}>
      <input
        type='hidden'
        name='id'
        defaultValue={id}
      />
      <input
        type='hidden'
        name='category'
        defaultValue={category}
      />
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
          required={true}
        />
      </div>
      <div className='field'>
        <label forhtml='input_author'>Title</label>
        <input
          id='input_title'
          readOnly={readOnly['title']}
          className='post-input'
          type='text'
          name='title'
          value={title || ''}
          onChange={onChange}
          required={true}
        />
      </div>
      <div className='field'>
        <label forhtml='input_body'>Body</label>
        <textarea
          id='input_body'
          readOnly={readOnly['body']}
          className='post-input'
          type='text'
          name='body'
          value={body || ''}
          onChange={onChange}
          required={true}
        />
      </div>
      <button className='icon-btn'>
        {submitCta}
      </button>
    </form>
  )
}