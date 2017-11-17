import React  from 'react'

export default function PostForm ({ post, submitCta, onChange, onSubmit }) {
  const { id, author, title, body, category } = post

  return (
    <form className='post-form'>
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
          className='post-input'
          type='text'
          name='author'
          value={author || ''}
          onChange={onChange}
        />
      </div>
      <div className='field'>
        <label forhtml='input_author'>Title</label>
        <input
          id='input_title'
          className='post-input'
          type='text'
          name='title'
          value={title || ''}
          onChange={onChange}
        />
      </div>
      <div className='field'>
        <label forhtml='input_body'>Body:</label>
        <textarea
          id='input_body'
          className='post-input'
          type='text'
          name='body'
          value={body || ''}
          onChange={onChange}
        />
      </div>
      <button
        className='icon-btn'
        onClick={onSubmit}>
        {submitCta}
      </button>
    </form>
  )
}