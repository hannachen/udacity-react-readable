import React  from 'react'

export default function PostForm ({ post, onChange, onSubmit }) {
  const { id, title, body, category } = post

  return (
    <div className='edit-post'>
      <h1 className="title">Edit post <strong>{category}</strong></h1>
      <form>
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
        <input
          className='post-input'
          type='text'
          placeholder='Title'
          name='title'
          value={title || ''}
          onChange={onChange}
        />
        <textarea
          className='post-input'
          type='text'
          placeholder='Body'
          name='body'
          value={body || ''}
          onChange={onChange}
        />
        <button
          className='icon-btn'
          onClick={onSubmit}>
          Edit Post
        </button>
      </form>
    </div>
  )
}