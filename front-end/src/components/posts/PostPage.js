import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { fetchPost, scorePost, deletePost } from '../../actions'
import Nav from '../Nav'
import CommentsList from '../comments/CommentList'
import TrashIcon from 'react-icons/lib/go/trashcan'
import ThumbUpIcon from 'react-icons/lib/md/thumb-up'
import ThumbDownIcon from 'react-icons/lib/md/thumb-down'

class PostPage extends Component {
  state = {
    voting: false,
    redirect: false,
    redirectCategory: null,
  }
  constructor(props, context) {
    super(props, context)
    this.fetchPost = this.fetchPost.bind(this)
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
    this.scorePost = this.scorePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }
  componentDidMount() {
    this.fetchPost()
  }
  fetchPost() {
    const { postId } = this.props.match.params
    const { fetchPost } = this.props
    fetchPost(postId)
      .catch(() => this.setState({
          redirect: true,
          redirectTarget: '/'
        })
      )
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
    scorePost({ postId, vote })
      .then(() => this.setState(() => ({
        voting: false,
      })))
  }
  deletePost() {
    const { post, deletePost } = this.props
    deletePost(post)
      .then(() => this.setState(() => ({
        redirect: true,
        redirectTarget: `/${post.category}`
      })))
  }

  render() {
    const { redirect, redirectTarget } = this.state
    if (redirect) {
      return <Redirect to={redirectTarget} />
    }

    const { category, post, commentCount } = this.props
    const { voting } = this.state
    const formattedDate = (post && post.timestamp) ? moment.unix(post.timestamp/1000).format("MMMM DD, YYYY hh:mma") : null

    if (!post) {
      return (
        <div>Post not found</div>
      )
    }
    return (
      <div className='post-page'>
        {category && post &&
          <Nav category={category} post={post} />
        }
        <div className='post'>
          <p className='author'>By: {post.author}</p>
          <p className='body'>{post.body}</p>
          <div className='meta'>
            <p className='date'>{formattedDate}</p>
            <div className='delete'>
              <button className='icon-btn' onClick={this.deletePost}>
                <TrashIcon size={20} />
              </button>
            </div>
          </div>
          <div className='post-actions'>
            <div className='comments'>
              <em>COMMENTS</em>
              <strong>{commentCount}</strong>
            </div>
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

const mapStateToProps = ({ categories, posts, comments }, ownProps) => {
  const { postId } = ownProps.match.params
  const post = posts['all'][postId] || null
  const category = post && post.category ? categories[post.category] : null
  const postComments = comments['byPost'][postId] || []
  return { category, post, commentCount: postComments.length }
}
export default connect(mapStateToProps, { fetchPost, scorePost, deletePost })(PostPage)