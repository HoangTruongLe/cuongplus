class ListLocation extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.suggestions.length > 0) {
      return ( 
        <div className="location">
          <div className="u-mypage cf">
            <div className="u-mypage-manu cf">
              { this.props.suggestions.map((location, i) => { 
                return (
                  <div className="u-manu-items cf" key={i}>
                    <a href="#" >
                      <i className="material-icons">{location.type == 'ALL' ? 'place' : 'home'}</i>
                      <div className="u-menu-text">
                        <span onClick={this.props.handleClick} data-location-display-name={location.display_name} className="u-title">{location.display_name}</span>
                      </div>
                    </a>
                  </div> 
                ) }) 
              } 
            </div> 
          </div>
        </div>
      );
    } else {
      return (''); 
    }
  }
}
