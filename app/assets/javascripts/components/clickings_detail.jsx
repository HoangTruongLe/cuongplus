class ClickingsDetail extends React.Component {
  constructor(props){
    super(props);
  }

  renderYears(){
    var _self = this;
    years = _self.props.clickings.years

    return years.map(function(e,i){
      return(
        <div className="year-block cf" key={i}>
          <div className="u-click-head" id={"ac" + e.year}>
            <button className="u-click-btn" data-toggle="collapse" data-target={'#ac'+e.year+'-block'} aria-expanded="true" aria-controls={'ac'+e.year+'-block'}>
              <div className="u-head">{e.year} 年</div>
              <div className="u-label badge badge-success">{e.year_count}</div>
            </button>
          </div>
          <div id={"ac"+e.year+"-block"} className="year-itmes collapse show" aria-labelledby={"ac"+e.year} data-parent="#accordion">
            {_self.renderMonths(e.year)}
          </div>
        </div>
      )
    })
  }

  renderMonths(year){
    var _self = this;
    months = _self.props.clickings.months
    return months.map(function(e,i){
      if (e.year == year){
        return(
          <article className="month-items" id={'accordion'+year+'-'+e.month} key={i} >
            <div className="u-click-head" id={'ac'+year+'-'+e.month}>
              <button className="u-click-btn" data-toggle="collapse" data-target={'#ac'+ year+'-'+ e.month+'-block'} aria-expanded="true" aria-controls={'ac'+ year+'-'+ e.month+'-block'}>
                <div className="u-head">{e.month}月</div>
                <div className="u-label badge badge-success">{e.count}</div>
              </button>
            </div>
            <div id={'ac'+ year+'-'+ e.month+'-block'} className="collapse" aria-labelledby={'ac'+year+'-'+e.month} data-parent={'#accordion'+year+'-'+e.month}>
              <ul className="day-imtes cf" key={i}>
                {_self.renderDays(e)}
              </ul>
            </div>
          </article>
        )
      }
    })
  }

  renderDays(m){
    days = this.props.clickings.days
    return days.map(function(e,i){
      if (e.month == m.month){
        return(
          <li key={i}><span>{e.day}日（{e.wday}）</span><span>{e.count}</span></li>
        )
      }
    })
  }

  render(){
    years = this.props.clickings.years
    months = this.props.clickings.months
    days = this.props.clickings.days

    blocks_years = this.renderYears()
    return(
      <div>
        {blocks_years}
      </div>
    )
  }
}