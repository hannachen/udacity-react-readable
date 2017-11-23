class Api {

  static requestHeaders() {
    var headers = new Headers()
    headers.append('Authorization', 'testing123')
    headers.append('Content-Type', 'application/json')
    return headers
  }

  static fetchCategories() {
    const request = new Request(`http://localhost:3001/categories`, {
      method: 'GET',
      headers: this.requestHeaders(),
    })
    return fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        return error
      })
  }

  static fetchAllPosts() {
    const request = new Request(`http://localhost:3001/posts`, {
      method: 'GET',
      headers: this.requestHeaders(),
    })
    return fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        return error
      })
  }

  static fetchPosts(category = '') {
    category = category.trim()
    const request = new Request(`http://localhost:3001/${category}/posts`, {
      method: 'GET',
      headers: this.requestHeaders(),
    })
    return fetch(request)
      .then((res) => res.json())
  }

  static fetchPost(id = '') {
    id = id.trim()
    const request = new Request(`http://localhost:3001/posts/${id}`, {
      method: 'GET',
      headers: this.requestHeaders(),
    })
    return fetch(request)
      .then((res) => res.json())
  }

  static addPost(data) {
    const request = new Request(`http://localhost:3001/posts`, {
      method: 'POST',
      headers: this.requestHeaders(),
      body: JSON.stringify(data),
    })
    return fetch(request)
      .then((res) => res.json())
  }

  static editPost(post) {
    const request = new Request(`http://localhost:3001/posts/${post.id}`, {
      method: 'PUT',
      headers: this.requestHeaders(),
      body: JSON.stringify({
        title: post.title,
        body: post.body
      }),
    })
    return fetch(request)
      .then((res) => res.json())
  }

  static scorePost(postId, vote) {
    const request = new Request(`http://localhost:3001/posts/${postId}`, {
      method: 'POST',
      headers: this.requestHeaders(),
      body: JSON.stringify({
        option: vote
      }),
    })
    return fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        return error
      })
  }

  static deletePost(postId) {
    const request = new Request(`http://localhost:3001/posts/${postId}`, {
      method: 'DELETE',
      headers: this.requestHeaders(),
    })
    return fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        return error
      })
  }

  static fetchPostComments(postId) {
    const request = new Request(`http://localhost:3001/posts/${postId}/comments`, {
      method: 'GET',
      headers: this.requestHeaders(),
    })
    return fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        return error
      })
  }

  static addComment(comment) {
    const request = new Request(`http://localhost:3001/comments`, {
      method: 'POST',
      headers: this.requestHeaders(),
      body: JSON.stringify(comment),
    })
    return fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        return error
      })
  }

  static editComment(comment) {
    const request = new Request(`http://localhost:3001/comments/${comment.id}`, {
      method: 'PUT',
      headers: this.requestHeaders(),
      body: JSON.stringify(comment),
    })
    return fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        return error
      })
  }

  static deleteComment(commentId) {
    const request = new Request(`http://localhost:3001/comments/${commentId}`, {
      method: 'DELETE',
      headers: this.requestHeaders(),
    })
    return fetch(request)
      .then(commentId)
      .catch((error) => {
        return error
      })
  }

  static scoreComment(commentId, vote) {
    const request = new Request(`http://localhost:3001/comments/${commentId}`, {
      method: 'POST',
      headers: this.requestHeaders(),
      body: JSON.stringify({
        option: vote
      }),
    })
    return fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        return error
      })
  }
}

export default Api