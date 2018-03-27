class Homes extends React.Component {
  constructor(props){
    super(props);
    this.visitor_uuid = this.props.visitor_uuid;
    this.channel_config = {
      channel: 'HomesChannel',
      visitor_uuid: this.props.visitor_uuid
    }

    this.state = {
      search_results: {},
      search_conditions: {
        visitor_uuid: this.props.visitor_uuid,
        adults: this.props.search_params["adults"] || 1,
        children: this.props.search_params["children"] || 0,
        infants: this.props.search_params["infants"] || 0,
        price_min: this.props.search_params["price_min"] || '',
        price_max: this.props.search_params["price_max"] || '',
        room_types: this.props.search_params["room_types"] || '',
        min_beds: this.props.search_params["min_beds"] || 0,
        min_bedrooms: this.props.search_params["min_bedrooms"] || 0,
        min_bathrooms: this.props.search_params["min_bathrooms"] || 0,
        section_offset: this.props.search_params["section_offset"] || 0,
        query: this.props.search_params["query"] || '',
        zoom: this.props.search_params["zoom"] || 11
      },
      
    }

    if ( this.props.search_params["search_by_map"] ) {
      this.state.search_conditions = { 
        visitor_uuid: this.props.visitor_uuid,
        section_offset: this.props.search_params["section_offset"] || 0,
        search_by_map: true,
        ne_lat: this.props.search_params["ne_lat"], 
        ne_lng: this.props.search_params["ne_lng"],
        sw_lat: this.props.search_params["sw_lat"],
        sw_lng: this.props.search_params["sw_lng"],
        zoom: this.props.search_params["zoom"]
      } 
    }
  }

  componentWillMount(){
    if (this.visitor_uuid) {
      this.generate_channel();
    }
  }

  

  generate_channel(){
    homes_component = this
    visitor_uuid = this.visitor_uuid;
    search_params = this.state.search_conditions;

    App.Home = App.cable.subscriptions.create(this.channel_config, {
      connected: function(){
        this.crawler(search_params);
      },

      received: function(result){
        this.append_crawler(result.homes)
      },
      crawler: function(params) {
        return this.perform("airbnb_crawler", params);
      },
      append_crawler: function(record) {
        homes_component.setState({ search_results: record });
        slickJs();
      }
    });
  }


  render(){
    const homes = this.getHomes();
    const pagination = this.showPagination();
    return (
      <main className="u-main cf" role="main">
        <div className="u-list-wrap cf homes" style={{margin: 'auto'}}>
          { homes }
        </div>
        { pagination }
      </main>
    )
  }

  add_markers_to_map() {
    // set center & zoom
    var first_room = this.state.search_results['homes'][0];
    var center = {lat: first_room.lat, lng: first_room.lng};
    map.setCenter(center);
    map.setZoom(parseInt(this.state.search_conditions.zoom));
    // add markers
    this.state.search_results['homes'].map((home, i) => {
      var container = document.createElement("div");
      var text = document.createTextNode('¥' +home.price);
      container.appendChild(text);
      popup = new Popup(new google.maps.LatLng(home.lat, home.lng), container);
      popup.setMap(map);
      markers.push(popup); 
    }); 
  }

  remove_markers_from_map() {
    markers_length = markers.length;
    if ( markers_length > 0 ) {
      for (var i = 0; i < markers_length; i++){
        markers[i].setMap(null); 
      } 
      markers.length = 0;
    } 
  }
  getHomes() {
    // remove markers 
    this.remove_markers_from_map(); 

    if ($.isEmptyObject(this.state.search_results)){
      // waiting for crawler
      var rows = [];
      for (var i = 0; i < 3; i++) {
        rows.push(<Spinner key={i}/>);
      }
      return rows
    } else if (this.state.search_results['homes'].length == 0) {
      // crawled but nothing
      return (<HomeNotFound />)
    } else {
      // add markers to map
      this.add_markers_to_map(); 
      return this.state.search_results['homes'].map((home, i) => {
        return(<Home home={home} key={i} signed_in={this.props.signed_in} bookmarks={this.props.bookmarks}/>);
      });
    }
  }

  showPagination() {
    if (!$.isEmptyObject(this.state.search_results)) {
      console.log(this.state.search_results['pagination'])
      return(<HomePagination pagination={ this.state.search_results['pagination'] } />);
    }
  }
}
