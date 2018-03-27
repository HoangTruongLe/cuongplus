class HomePagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      back_link: this.props.pagination["back_link"],
      next_link: this.props.pagination["next_link"]
    }
  }

  render() {
    return (
      <nav className="u-pager cf">
        { this.getBackLink() }
        { this.getNextLink() }
      </nav>
    )
  }

  getBackLink() {
    if (this.state.back_link != '') {
      return (
        <a className="u-page u-back" href={ this.state.back_link }>
          <i className="material-icons">keyboard_arrow_left</i>
          back
        </a>
      )
    }
  }

  getNextLink() {
    if (this.state.next_link != '') {
      return (
        <a className="u-page u-next" href={ this.state.next_link }>
        next
        <i className="material-icons">keyboard_arrow_right</i>
      </a>
      )
    }
  }
}