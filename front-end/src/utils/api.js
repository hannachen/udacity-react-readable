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

  /*
  function fetchPosts() {
    const URL = "https://jsonplaceholder.typicode.com/posts";
    return fetch(URL, { method: 'GET'})
      .then( response => Promise.all([response, response.json()]));
  }
  */

  static fetchPosts(category = '') {
    category = category.trim()
    console.log('FETCH CATEGORY?', category)
    const request = new Request(`http://localhost:3001/${category}/posts`, {
      method: 'GET',
      headers: this.requestHeaders(),
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