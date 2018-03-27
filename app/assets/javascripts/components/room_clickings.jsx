class RoomClickings extends React.Component {
  constructor(props){
    super(props)
    this.channel_config = {
      channel: this.props.channel,
      uuid: this.props.uuid,
      room_id: this.props.room.id
    };

    this.state = {
      roomClickings: {},
    }
  }

  componentWillMount(){
    this.generate_channel()
  }

  generate_channel(){
    var _self = this;

    App.HostRooms = App.cable.subscriptions.create(this.channel_config, {
      received: function(result){
        if(result.data.type == 'crawler'){
          _self.setState({roomClickings: result.data.record})
        }
      }
    });
  }

  defaultNoImage(){
    return(
      <div className="u-slide cf">
        <a href="javascript:void(0)">
          <img src="javascript:void(0)" alt="" width='100%'/>
        </a>
      </div>
    )
  }

  listImage(){
    return this.state.roomClickings.img_service.map(function(i,e){
      if (e < 4){
        return (
          <div className="u-slide cf" key={e}>
            <img src={i['large']} alt="" width='100%'/>
          </div>
        )
      }
    })
  }

  renderClickingDetails(){
    return (
      <ClickingsDetail clickings={this.props.clickings} />
    )
  }

  renderLayout(){
    let room = this.state.roomClickings
    let clickingsDetail = this.renderClickingDetails()

    if(room.img_service.length == 0){
      images = this.defaultNoImage()
    }else{
      images = this.listImage()
    }

    return (
      <div>
        <div className="u-thumbnail u-details-slider-block">
          <div className="u-details-slider cf">
            { images }
          </div>
        </div>
        <div className="dashboard-main row cf">
          <main className="dashboard-main-inner col-12 col-md-12" role="main">
            <div className="u-room-description cf">
              <h1 className="u-name">{room.name_service}</h1>
              <p className="u-spec">{room.type_service}</p>
              <div className="u-status cf">
                <p className="u-price">{room.price_service} /泊</p>
              </div>
            </div>
            <div className="bg_white mt1 pd1_6 cf">
              <div className="fs1_5 pb1 font-weight-bold text-left">クリック数計測</div>
              <ul className="u-post-archives-tab nav nav-tabs">
                <li className="nav-item active">
                  <a className="" href="#">airbnb</a>
                </li>
                <li className="nav-item">
                  <a className="" href="#">tripadvisor</a>
                </li>
              </ul>
              <div className="u-post-archives cf">
                <div id="accordion">
                  { clickingsDetail }
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  render(){
    let room = this.state.roomClickings
    if(Object.keys(room).length != 0){
      render = this.renderLayout()
    }else{
      render = <div></div>
    }

    return(
      <div>{render}</div>
    )

  }
}
