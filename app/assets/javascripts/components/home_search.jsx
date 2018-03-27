const airbnb_const = {
  max_adults_number: 16,
  min_adults_number: 1,
  max_childs_number: 5,
  max_infants_number: 5,
  max_rooms_number: 16
}
class HomeSearch extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      airbnb_adults_number: this.props.data["adults"] || 1,
      airbnb_childs_number: this.props.data["children"] || 0,
      airbnb_infants_number: this.props.data["infants"] || 0,
      airbnb_price_min: this.props.data["price_min"] || '',
      airbnb_price_max: this.props.data["price_max"] || '',
      airbnb_room_type_entire_home: (this.props.data["room_types"] !== undefined && this.props.data["room_types"].indexOf('Entire home/apt') !== -1) ? true : false,
      airbnb_room_type_private_home: (this.props.data["room_types"]!== undefined && this.props.data["room_types"].indexOf('Private room') !== -1) ? true : false,
      airbnb_room_type_shared_home: (this.props.data["room_types"] !== undefined && this.props.data["room_types"].indexOf('Shared room') !== -1) ? true : false,
      airbnb_min_beds: this.props.data["min_beds"] || 0,
      airbnb_min_bedrooms: this.props.data["min_bedrooms"] || 0,
      airbnb_min_bathrooms: this.props.data["min_bathrooms"] || 0,
      airbnb_place: this.props.data["query"] || '',
      show_details: (this.props.data["show_details"] !== undefined && this.props.data["show_details"] === 'true') ? true : false
    } 

    this.handleIncreaseChange  = this.handleIncreaseChange.bind(this);
    this.handleDecreaseChange  = this.handleDecreaseChange.bind(this);
    this.handleCheckTypeChange = this.handleCheckTypeChange.bind(this);
    this.handleInputChange     = this.handleInputChange.bind(this);
    this.handleChangeToggle    = this.handleChangeToggle.bind(this);
    this.handleClick           = this.handleClick.bind(this); 
    this.handleOnClickClear    = this.handleOnClickClear.bind(this);
  }

  // Run JS to show with bootstrap Material
  componentDidMount() {
    $('.u-search-box').bootstrapMaterialDesign();
  }

  render() {
    var airbnb_collapse = `collapse ${this.state.show_details ? 'show' : ''}`
    var toggle_collapse = `u-search-btn ${this.state.show_details ? '' : 'collapsed'}`
    return (
      <section className="u-search-box cf" id="u-search-accordion">
        <div className="main-width inner cf">
          <nav className="u-search-nav cf">
            <p className="title">検索対象</p>
            <ul className="u-tab cf">
              <li>
                <a className="" data-toggle="collapse" data-target="#u-tab-airbnb">
                  <span> Airbnb</span>
                </a>
              </li>
              <li>
                <a className="collapsed" data-toggle="collapse" data-target="#u-tab-minpaku">
                  <span>民泊.com</span>
                </a>
              </li>
            </ul>
          </nav>
          <form action="/" method="get" form-name="airbnb">
            <section id="u-tab-airbnb" className="collapse show" aria-labelledby="u-tab-airbnb" data-parent="#u-search-accordion">
              <a className={toggle_collapse} data-toggle="collapse" data-target="#u-tab-airbnb-inner" onClick={this.handleChangeToggle}>
                <div className="u-btn u-btn-open">検索メニューを開く<i className="material-icons">arrow_drop_down</i></div>
                <div className="u-btn u-btn-close">検索メニューを閉じる<i className="material-icons">arrow_drop_up</i></div>
              </a>
              <article id="u-tab-airbnb-inner" className={airbnb_collapse} aria-labelledby="u-tab-airbnb-inner" data-parent="#u-tab-airbnb">
                <section className="u-custom-search-items cf">
                  <div className="row pt1 cf">
                    <div className="col-2 u-title-block">ゲスト人数</div>
                    <div className="col-10 row u-guest-block cf">
                      <div className="d-flex f-align-items-center u-items">
                        <div className="u-title">
                          <span className="u-big">大人</span>
                        </div>
                        <button type="button" className="count-btn count-down" 
                                name="airbnb_adults_number" 
                                onClick={this.handleDecreaseChange}
                                min={airbnb_const.min_adults_number}>
                          <i className="material-icons" 
                            name="airbnb_adults_number"
                            min={airbnb_const.min_adults_number}>
                              remove
                          </i>
                        </button>
                        <input type="hidden" name="adults" value={this.state.airbnb_adults_number}/>
                        <div className="count-number">{this.state.airbnb_adults_number}</div>
                        <button type="button" className="count-btn count-up" 
                                name="airbnb_adults_number" 
                                onClick={this.handleIncreaseChange}
                                max={airbnb_const.max_adults_number}>
                          <i className="material-icons" 
                              name="airbnb_adults_number"
                              max={airbnb_const.max_adults_number}>
                              add
                          </i>
                        </button>
                      </div>
                      <div className="d-flex f-align-items-center u-items">
                        <div className="u-title">
                          <span className="u-big">子ども</span>
                          <span className="u-small">年齢2-12</span>
                        </div>
                        <button type="button" className="count-btn count-down"
                                name="airbnb_childs_number" 
                                onClick={this.handleDecreaseChange}>
                          <i className="material-icons" 
                            name="airbnb_childs_number">
                              remove
                          </i>
                        </button>
                        <input type="hidden" name="children" 
                                value={this.state.airbnb_childs_number} 
                                onClick={this.handleDecreaseChange}/>
                        <div className="count-number">{this.state.airbnb_childs_number}</div>
                        <button type="button" className="count-btn count-up" 
                                name="airbnb_childs_number" 
                                onClick={this.handleIncreaseChange}
                                max={airbnb_const.max_childs_number}>
                          <i className="material-icons" 
                              name="airbnb_childs_number"
                              max={airbnb_const.max_childs_number}>
                              add
                          </i>
                        </button>
                      </div>
                      <div className="d-flex f-align-items-center u-items">
                        <div className="u-title">
                          <span className="u-big">乳幼児</span>
                          <span className="u-small">2歳未満</span>
                        </div>
                        <button type="button" className="count-btn count-down"
                                name="airbnb_infants_number" 
                                onClick={this.handleDecreaseChange}>
                          <i className="material-icons" name="airbnb_infants_number">remove</i>
                        </button>
                        <input type="hidden" name="infants" value={this.state.airbnb_infants_number}/>
                        <div className="count-number">{this.state.airbnb_infants_number}</div>
                        <button type="button" className="count-btn count-up" 
                                name="airbnb_infants_number" 
                                onClick={this.handleIncreaseChange}
                                max={airbnb_const.max_infants_number}>
                          <i className="material-icons" 
                              name="airbnb_infants_number"
                              max={airbnb_const.max_infants_number}>
                              add
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row pt2 cf">
                    <div className="col-2 u-title-block">住宅タイプ</div>
                    <div className="col-10 row u-type-block cf">
                      <div className="d-flex f-align-items-center u-items">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" data-name="airbnb_room_type_entire_home"
                                  name="room_types" value="Entire home/apt"
                                  checked={this.state.airbnb_room_type_entire_home} 
                                  onChange={this.handleCheckTypeChange}/>
                            <div className="u-title">
                              <span className="u-big">まるまる貸し切り</span>
                              <span className="u-small">まるまる独り占めできる住まい</span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="d-flex f-align-items-center u-items">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" data-name="airbnb_room_type_private_home"
                                  name="room_types"     
                                  value="Private home"
                                  checked={this.state.airbnb_room_type_private_home} 
                                  onChange={this.handleCheckTypeChange}/>
                            <div className="u-title">
                              <span className="u-big">個室</span>
                              <span className="u-small">自分専用の個室＋共用スペース</span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="d-flex f-align-items-center u-items">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" data-name="airbnb_room_type_shared_home"
                                  name="room_types"
                                  value="Shared home"
                                  checked={this.state.airbnb_room_type_shared_home} 
                                  onChange={this.handleCheckTypeChange}/>
                            <div className="u-title">
                              <span className="u-big">シェアルーム</span>
                              <span className="u-small">相部屋などのシェアルーム</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row pt2 cf">
                    <div className="col-2 u-title-block">一泊</div>
                    <div className="col-10 u-price-block cf">
                      <div className="u-price-area">
                        <input type="text" placeholder="1000" 
                              name="price_min" 
                              data-name="airbnb_price_min"
                              value={this.state.airbnb_price_min}
                              onChange={this.handleInputChange}/>
                        <input type="text" placeholder="100000" 
                              name="price_max"
                              data-name="airbnb_price_max"
                              value={this.state.airbnb_price_max}
                              onChange={this.handleInputChange}/>
                      </div>
                      <p className="u-price-area-text">平均相場は1泊あたり約¥8,000です</p>
                    </div>
                  </div>
                  <div className="row pt2 cf">
                    <div className="col-2 u-title-block">こだわり条件</div>
                    <div className="col-10 row u-kodawari-block cf">
                      <div className="d-flex f-align-items-center u-items">
                        <div className="u-title">
                          <span className="u-big">ベッド</span>
                        </div>
                        <button type="button" className="count-btn count-down"
                                name="airbnb_min_beds" 
                                onClick={this.handleDecreaseChange}>
                          <i className="material-icons" name="airbnb_min_beds">remove</i>
                        </button>
                        <input type="hidden" name="min_beds" value={this.state.airbnb_min_beds} />
                        <div className="count-number">{this.state.airbnb_min_beds}</div>
                        <button type="button" className="count-btn count-up"
                                name="airbnb_min_beds" 
                                onClick={this.handleIncreaseChange}>
                          <i className="material-icons" 
                              name="airbnb_min_beds" 
                              max={airbnb_const.max_rooms_number}>
                                add
                          </i>
                        </button>
                      </div>
                      <div className="d-flex f-align-items-center u-items">
                        <div className="u-title">
                          <span className="u-big">寝室</span>
                        </div>
                        <button type="button" className="count-btn count-down"
                                name="airbnb_min_bedrooms" 
                                onClick={this.handleDecreaseChange}>
                          <i className="material-icons" name="airbnb_min_bedrooms">remove</i>
                        </button>
                        <input type="hidden" name="min_bedrooms" value={this.state.airbnb_min_bedrooms} />
                        <div className="count-number">{this.state.airbnb_min_bedrooms}</div>
                        <button type="button" className="count-btn count-up"
                                name="airbnb_min_bedrooms" 
                                onClick={this.handleIncreaseChange}>
                          <i className="material-icons" 
                              name="airbnb_min_bedrooms" 
                              max={airbnb_const.max_rooms_number}>
                                add
                          </i>
                        </button>
                      </div>
                      <div className="d-flex f-align-items-center u-items">
                        <div className="u-title">
                          <span className="u-big">バスルーム</span>
                        </div>
                        <button type="button" className="count-btn count-down"
                                name="airbnb_min_bathrooms" 
                                onClick={this.handleDecreaseChange}>
                          <i className="material-icons" name="airbnb_min_bathrooms">remove</i>
                        </button>
                        <input type="hidden" name="min_bathrooms" value={this.state.airbnb_min_bathrooms}/>
                        <div className="count-number">{this.state.airbnb_min_bathrooms}</div>
                        <button type="button" className="count-btn count-up"
                                name="airbnb_min_bathrooms" 
                                onClick={this.handleIncreaseChange}>
                          <i className="material-icons" 
                              name="airbnb_min_bathrooms" 
                              max={airbnb_const.max_rooms_number}>
                                add
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </article>
              <input type="hidden" name="show_details" value={this.state.show_details} />
              
            </section>

            <section id="u-tab-minpaku" className="collapse" aria-labelledby="u-tab-minpaku" data-parent="#u-search-accordion">
              民泊.com中身
            </section>

            <article>
              <div className="u-search-area cf">
                <div className="input-search">
                  <input className="input" 
                        type="search" 
                        onChange={this.handleInputChange}
                        name="query"
                        data-name="airbnb_place"
                        value={this.state.airbnb_place} 
                        autoComplete="false"
                        placeholder="東京" />
                <i onClick={this.handleOnClickClear} className="clear material-icons">{ this.state.airbnb_place.length > 0 ? 'clear' : 'search' }</i>
                </div>
                <div id="suggestions"></div>
                <button type="submit" className="btn-search btn-size-LL site-color shadow">
                  <span>検索</span>
                </button>
              </div>
            </article>
          </form>
        </div>
      </section>
    )
  }

  handleChangeToggle(event) {
    this.setState({
      show_details: !this.state.show_details
    });
  }

  // click on + button
  handleIncreaseChange(event) {
    const target = event.target;
    const name = target.getAttribute("name");
    const max = target.getAttribute("max");
    if (this.state[name] < max) {
      this.setState({
        [name]: parseInt(this.state[name]) + 1
      });
    }
  }

  // click on - button
  handleDecreaseChange(event) {
    const target = event.target;
    const name = target.getAttribute("name");
    const min = target.getAttribute("min") || 0;
    if (this.state[name] > min) {
      this.setState({
        [name]: parseInt(this.state[name]) - 1
      });
    }
  }

  // on checked 住宅タイプ
  handleCheckTypeChange(event) {
    const target = event.target;
    const name = target.getAttribute("data-name");
    this.setState({
      [name]: !this.state[name]
    });
  }

  // on change price + place search
  handleInputChange(event) {
    const target = event.target;
    const name = target.getAttribute("data-name");
    const value = target.value;
    const inputLength = value.length;
    const suggestions_element = document.getElementById("suggestions"); 
    let _this = this;
    
    this.setState({
      [name]: value
    });

    if (inputLength > 0) {
      axios.get('/home/locations?user_input=' + value)
      .then(function (response) {
        ReactDOM.render(<ListLocation handleClick={_this.handleClick} suggestions={response.data}/>, suggestions_element);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      ReactDOM.render(<ListLocation handleClick={_this.handleClick} suggestions={[]}/>, suggestions_element);
    }
    
  }

  handleClick(event) {
    event.preventDefault();
    const target = event.target;
    const location_display_name = target.getAttribute("data-location-display-name");
    this.setState({
      airbnb_place: location_display_name 
    })
    ReactDOM.render(<ListLocation handleClick={this.handleClick} suggestions={[]} />, document.getElementById("suggestions"));
  }

  handleOnClickClear(event) {
    this.setState({
      airbnb_place: '' 
    });
    ReactDOM.render(<ListLocation handleClick={this.handleClick} suggestions={[]} />, document.getElementById("suggestions"));
  }
}
