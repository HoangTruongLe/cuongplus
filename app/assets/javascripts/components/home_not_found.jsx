class HomeNotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div style={{ margin: 'auto' }}>
        <div>
          <div>
            <div style={{margin: "64px 40px 96px", textAlign: "left"}}>
              <section>
                <div className="home-no-result">
                  <h1 tabIndex="-1" className="home-no-result-info">No results</h1>
                </div>
                <div style={{ marginTop: "8px", marginBottom: "32px" }}>
                <div className="home-no-result-guide">
                  <div>
                    <div style={{ marginBottom: "8px" }}>
                      <span>Try adjusting your search. Here are some ideas:</span>
                    </div>
                    <ul>
                      <li>
                        <span>Change your filters or dates</span>
                      </li>
                      <li>
                        <span>Zoom out on the map</span>
                      </li>
                      <li>
                        <span>Search for a specific city, address, or landmark</span>
                      </li>
                    </ul>
                    </div>
                  </div>
                </div>
              </section>
              <form action="/" method="get">
                <button type="submit" className="home-no-result-button" aria-busy="false" href="/">
                  <span>Remove all filters</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
