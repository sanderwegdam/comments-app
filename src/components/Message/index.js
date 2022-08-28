import './message.css'
import { IoMdTrash } from 'react-icons/io';

const CommentItem = props => {
  const { arrayList, deleteComment } = props
  const {
    id,
    firstNames,
    comments,
    dates,
  } = arrayList

  const delButton = () => {
    deleteComment(id)
  }

  return (
    <div className="comment-item" key={id}>
      <div className="content">
        <p className="user-name">{firstNames}</p>
        <p className="time">{dates}</p>
        <div className="content-item">
          <p className="comment-line" >{comments}</p>
        </div>
      </div>
      <div className="icons">
        <button
          type="button"
          className="delete-btn"
          onClick={delButton}
          testid="delete"> <IoMdTrash className="delete-icon" />
        </button>
      </div>
    </div>
  )
}
export default CommentItem
