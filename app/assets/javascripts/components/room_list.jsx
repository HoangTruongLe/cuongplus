class RoomList extends React.Component {
  constructor(props){
    super(props);
    this.channel_config = {
      channel: this.props.channel,
      uuid: this.props.uuid,
      channel_id: this.props.channel_id
    }

    this.state = {
      recordsCrawler: [],
      resultCount: 0
    }
  }

  componentWillMount(){
    this.generate_channel()
  }

  generate_channel(){
    var vm = this;
    room_ids = vm.room_ids;
    id_current = 0;
    var result_count = 0;

    App.HostRooms = App.cable.subscriptions.create(vm.channel_config, {
      received: function(result){
        if(result.data.type == 'crawler'){
          result_count ++;
          vm.setState({resultCount: result_count})
          this.append_crawler(result.data.record)
        }
      },

      append_crawler: function(record){
        crawlers = vm.state.recordsCrawler.slice()
        crawlers.push(<div key={crawlers.length}> <Room room={record} /> </div>)
        vm.setState({recordsCrawler: crawlers})
      }
    });
  }


  spinner(){
    if (this.state.resultCount != this.props.roomCount){
      return <Spinner />
    }
  }

  render(){
    const spinner = this.spinner();
    const { recordsCrawler } = this.state;

    return (
      <main role="main">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">トップ</a></li>
            <li className="breadcrumb-item active" aria-current="page">所有してる部屋一覧</li>
          </ol>
        </nav>
        <header className="row f-align-items-center mt1 cf">
          <h1 className="col-6 col-md-7 main_title">部屋一覧</h1>
          <div className="col-6 col-md-5 row">
            <a href="_img_dummy/sample.csv" target="_blank" className="col-12 col-md-6 btn btn-custom btn-dark">
              サンプルCSVダウンロード
            </a>
            <button type="button" className="col-12 col-md-6 btn btn-custom btn-raised btn-info" data-toggle="modal" data-target="#csvModal">
              部屋のデータを紐付ける
            </button>
          </div>
        </header>
        <div className="u-list-wrap cf list-rooms">
          { recordsCrawler }
        </div>
          { spinner }
      </main>
    )
  }
}
