
const Content = {}

Content.ExistingMarker = React.createClass({
  render() {
    const date = this.props.info.foray.date
    const formattedDate = date.slice(0,4) + "-" + date.slice(4,6) + "-" + date.slice(6,8)
    
    return (<div className="dialog-body-div">
      <h3>{this.props.info.place.name}</h3>
      <p>{this.props.info.place.notes}</p>
      <h3>{formattedDate}</h3>
      <h4>{this.props.info.foray.name}</h4>
      <h4>{this.props.info.foray.notes}</h4>
    </div>)
  }
})
