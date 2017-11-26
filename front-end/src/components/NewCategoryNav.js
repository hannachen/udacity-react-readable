import React, { Component } from 'react'

class NewCategoryNav extends Component {
  state = {
    open: false,
  }
  constructor(props, context) {
    super(props, context)

    this.onCategoryOpen = this.onCategoryOpen.bind(this)
    this.onCategoryClose = this.onCategoryClose.bind(this)
    this.onCategorySelect = this.onCategorySelect.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }
  onCategoryOpen() {
    this.setState({
      open: !this.state.open
    })
    document.addEventListener('click', this.handleOutsideClick, false)
  }
  onCategoryClose() {
    this.setState({
      open: false
    })
    document.removeEventListener('click', this.handleOutsideClick, false)
  }
  onCategorySelect(e) {
    const { onCategorySelect } = this.props
    const category = e.target.value
    onCategorySelect(category)
  }
  handleOutsideClick(e) {
    if (!this.dropdown.contains(e.target)) {
      this.onCategoryClose()
    }
  }

  render() {
    const { categories, category } = this.props
    const { open } = this.state
    const currentCategory = (category && category.name) ? category.name : ''
    const categoryOptions = Object.keys(categories)

    // Add default empty value
    categoryOptions.unshift('')

    return (
      <div className='breadcrumb'>
        <nav className={(category? 'category-select' : 'category-select no-category')}>
          <h1>
            <em>Category</em>
            <div className='selected-option' onClick={this.onCategoryOpen}>{currentCategory !== '' ? currentCategory : 'Select a category'}</div>
            <div className={(open ? 'options open' : 'options')} ref={(dropdown) => { this.dropdown = dropdown }}>
              {categoryOptions.map((cat) => (
                <label className={(currentCategory === cat ? 'category-field selected' : 'category-field')} key={cat}>
                  <input
                    type='radio'
                    name='category'
                    id={`category_${cat}`}
                    value={cat}
                    checked={(category === cat)}
                    readOnly={(category === cat)}
                    onClick={this.onCategoryClose}
                    onChange={this.onCategorySelect}
                  />
                  {cat !== '' ? cat : 'Select a category'}
                </label>
              ))}
            </div>
          </h1>
          <h2 className='subtitle'>Adding a new post</h2>
        </nav>
      </div>
    )
  }
}

export default NewCategoryNav