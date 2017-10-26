class Api {

  static requestHeaders() {
    var headers = new Headers()
    headers.append('Authorization', 'testing123')
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

  static fetchPosts(category = '') {
    category = category.trim()
    const request = new Request(`http://localhost:3001/${category}/posts`, {
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
      body: data,
    })
    return fetch(request)
      .then((res) => res.json())
  }

  static fetchAllPosts() {
    return fetch(`http://localhost:3001/posts`)
      .then((res) => res.json())
      .then(({ hits }) => hits.map(({ posts }) => posts))
  }
}

export default Api