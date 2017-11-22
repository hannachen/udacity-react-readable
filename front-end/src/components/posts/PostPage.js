import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchPost, scorePost } from '../../actions'
import api from '../../utils/api'
import Nav from '../Nav'
import CommentsList from '../comments/CommentList'
import ThumbUpIcon from 'react-icons/lib/md/thumb-up'
import ThumbDownIcon from 'react-icons/lib/md/thumb-down'

class PostPage extends Component {
  state = {
    voting: false,
  }
  constructor(props, context) {
    super(props, context)
    this.fetchPost()
    this.fetchPost = this.fetchPost.bind(this)
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
    this.scorePost = this.scorePost.bind(this)
  }
  fetchPost() {
    const { postId } = this.props.match.params
    const { fetchPost } = this.props
    api.fetchPost(postId)
      .then(fetchPost)
  }
  upVote() {
    this.scorePost('upVote')
  }
  downVote() {
    this.scorePost('downVote')
  }
  scorePost(vote) {
    const { postId } = this.props.match.params
    this.setState(() => ({ voting: true }))
    const { scorePost } = this.props
    api.scorePost(postId, vote)
      .then(scorePost)
      .then((res) => this.setState(() => ({
        voting: false,
      })))
  }

  render() {
    const { category, post } = this.props
    const { voting } = this.state
    const formattedDate = (post && post.timestamp) ? moment.unix(post.timestamp/1000).format("MMMM DD, YYYY hh:mma") : null

    if (!post) {
      return (
        <div>Post not found</div>
      )
    }
    return (
      <div className='post-page'>
        <Nav category={category} post={post} />
        <div className='post'>
          <p className='author'>By: {post.author}</p>
          <p className='body'>{post.body}</p>
          <p className='date'>{formattedDate}</p>
          <div className='post-score'>
            <div className='score'>
              <em>SCORE</em>
              <strong>{post.voteScore}</strong>
            </div>
            <ul className='post-vote'>
              <li>
                <button onClick={this.upVote} disabled={voting} className='upvote'>
                  <ThumbUpIcon size={22} />
                </button>
              </li>
              <li>
                <button onClick={this.downVote} disabled={voting} className='downvote'>
                  <ThumbDownIcon size={22} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <CommentsList post={post} />
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }, ownProps) => {
  const { postId } = ownProps.match.params
  const post = posts['all'][postId] || null
  const category = post && post.category ? categories[post.category] : null
  return {
    category,
    post,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (data) => dispatch(fetchPost(data)),
    scorePost: (data) => dispatch(scorePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostPage)