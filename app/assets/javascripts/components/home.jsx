class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      home: this.props.home
    };

    this.handleFavoriteChange = this.handleFavoriteChange.bind(this);
    this.storeGuestBookmark   = this.storeGuestBookmark.bind(this);
    this.storeUserBookmark    = this.storeUserBookmark.bind(this);
    this.clickRoom    = this.clickRoom.bind(this);
  }

  componentWillMount() {
    var _this = this;
    var home_data = this.state.home;
    var bookmarks = this.props.bookmarks;
    var bookmarked_index = null;
    if (this.props.signed_in) {
      // registered user
      $.each(bookmarks, function(index, value) {
        if (home_data['service_id'] == value ) {
          home_data['active'] = true;
          return false;
        }
      });
    } else if (localStorage.bookmarks != null) {
      // guest user
      // get data from localStorage
      bookmarks = JSON.parse(localStorage.bookmarks)
      $.each(bookmarks, function(index, value) {
        if (home_data['service_id'] == value['service_id'] ) {
          home_data['active'] = true;
          return false;
        }
      });
    }
    _this.setState({ home: home_data });
  }

  render() {
    let imagesSlider = this.getImagesSlider();
    let uFavorite = "u-favorite";
    if (this.state.home['active'] != 'undefined' && this.state.home['active'] == true) {
      uFavorite += " active"
    }
    return (
      <article className="u-home-imtes">
        <div className="u-thumbnail">
          <div className="js-slider cf">
            { imagesSlider }
          </div>
          <div className={ uFavorite } onClick={ this.handleFavoriteChange }>
            <i className="material-icons u-off">favorite_border</i>
            <i className="material-icons u-on">favorite</i>
          </div>
        </div>
        <div className="u-description cf">
          <a href={ this.state.home['url'] } className="u-link" target="_blank" onClick= { this.clickRoom }>
            <p className="u-spec">{ this.state.home['spec'] }</p>
            <h1 className="u-name">{ this.state.home['name'] }</h1>
            <div className="u-status cf">
              <p className="u-price">¥{this.state.home['price']}〜　/泊</p>
            </div>
          </a>
        </div>
      </article>
    );
  }

  getImagesSlider() {
    return this.state.home['pictures'].map((pic_link, i) => {
      if (i < 5) {
        return (
          <div className="u-slide cf" key={i}>
            <a href="javascript::void(0);">
              <img src={ pic_link } height="250px" width='100%' />
            </a>
          </div>
        )
      }
    })
  }

  handleFavoriteChange(event) {
    if (this.props.signed_in) {
      // registed user
      this.storeUserBookmark(event);
    } else {
      // guest user
      this.storeGuestBookmark(event);
    }
  }

  storeGuestBookmark(event) {
    let _this = this;
    let home = _this.state.home;
    home['active'] = true;
    if (typeof(Storage) !== "undefined") {
      var room  = { service_id: this.state.home['service_id'],
                    pictures: this.state.home['pictures'],
                    name: this.state.home['name'],
                    price: this.state.home['price'],
                    currency: this.state.home['currency'],
                    url: this.state.home['url'],
                    spec: this.state.home['spec'] }
      var bookmarks = []
      if (localStorage.bookmarks != null) {
        bookmarks = JSON.parse(localStorage.bookmarks)
        // checking if this home was stored or not
        $.each(bookmarks, function(index, value) {
          if (room.service_id == value['service_id'] ) {
            // change to inactive and remove
            home['active'] = false
            bookmarks.splice(index, 1)
            return false
          }
        });
      }
      // change state
      _this.setState({ home: home });
      // when don't existed in localStorage
      if (home['active'] === true) {
        bookmarks.push(room);
      }
      // store bookmarks to localStorage
      localStorage.bookmarks = JSON.stringify(bookmarks)
    } else {
      console.log("NOT SUPPORT");
    }
  }

  storeUserBookmark(event) {
    let _this = this;
    let home_data = _this.state.home;
    axios.post('/home/user_bookmark', {
      authenticity_token: $('#authenticity_token').val(),
      service_id: this.state.home['service_id']
    })
    .then(function (response) {
      if (response.data['status'] == 'ok') {
        home_data['active'] = !home_data['active'];
        _this.setState({ home: home_data });
      } else {
        console.log("Can't update state");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  clickRoom(event) {
    let _this = this;
    let home_data = _this.state.home;
    axios.post('/home/user_click_room', {
      authenticity_token: $('#authenticity_token').val(),
      service_id: this.state.home['service_id']
    })
    .then(function (response) {
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
