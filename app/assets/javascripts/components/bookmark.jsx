class Bookmark extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    slickJs();
  }
  render(){
    const homes = this.getHomes();
    return (
      <main className="u-main cf" role="main" style={{marginBottom: "50px"}}>
        <div className="u-list-wrap cf homes">
          { homes }
        </div>
      </main>
    )
  }

  getHomes() {
    if (localStorage.bookmarks){
      var bookmarks = JSON.parse(localStorage.bookmarks)
      return bookmarks.map((home, i) => {
        return(<Home home={home} key={i} signed_in={null} bookmarks={ bookmarks }/>);
      });
    }
  }
}
