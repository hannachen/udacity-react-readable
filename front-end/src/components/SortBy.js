import React  from 'react'
import UpVoteIcon from 'react-icons/lib/go/triangle-up'
import DownVoteIcon from 'react-icons/lib/go/triangle-down'
import DashIcon from 'react-icons/lib/fa/minus'

export default function SortBy ({ title, fields, order, orderBy, onSort, disabled }) {

  return (
    <div className={disabled ? 'sorting-container disabled' : 'sorting-container'}>
      <div className='sort-title'>{title}</div>
      <div className='sorting-options'>
        {fields.map((field) => (
          <label className={(orderBy === field ? 'sort-field selected' : 'sort-field')} key={field}>
            <input
              id={`sort_${field}`}
              type="radio"
              value={field}
              checked={(orderBy === field)}
              onClick={onSort}
            />
            {field === orderBy ?
              (<div className='order'>
                {order === 'desc' ?
                  (<DownVoteIcon size={18} />)
                  :
                  (<UpVoteIcon size={18} />)
                }
              </div>)
              :
              (<DashIcon size={14} />)
            }
            <span>{field}</span>
          </label>
        ))}
      </div>
    </div>
  )
}