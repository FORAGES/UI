
var Form = {}

Form.CreateMarker = React.createClass({
  componentDidMount() {
    if (this.refs.placeName)
      this.refs.placeName.getDOMNode().focus()
  },
  
  onSave(e) {
    e.preventDefault()
    
    this.props.onSave({
      place: {
        name:  React.findDOMNode(this.refs.placeName).value,
        notes: React.findDOMNode(this.refs.placeNotes).value,
      },
      foray: {
        date: (React.findDOMNode(this.refs.forayYear).value +
               React.findDOMNode(this.refs.forayMonth).value +
               React.findDOMNode(this.refs.forayDay).value),
        name:  React.findDOMNode(this.refs.forayName).value,
        notes: React.findDOMNode(this.refs.forayNotes).value,
      },
    })
  },
  
  numberBox(name, first, last, current, options) {
    var numbers = []
    for (var i = first; i <= last; i++) {
      var iText = (i < 10) ? ("0" + i) : ("" + i)
      numbers.push(<option key={"name"+iText} value={iText}>{iText}</option>)
    }
    
    if (options && options["reverse"])
      numbers.reverse()
    
    var currentText = (current < 10) ? ("0" + current) : ("" + current)
    
    return (<select ref={name} className="dialog-body-row-item" defaultValue={currentText}>
      {numbers}
    </select>)
  },
  
  dateBoxes() {
    var date = new Date()
    var year = date.getFullYear()
    
    return (<div className="dialog-body-row-div">
      {this.numberBox("forayYear", year - 200, year + 1, year, { reverse: true })}
      {this.numberBox("forayMonth", 1, 12, date.getMonth() + 1)}
      {this.numberBox("forayDay",   1, 31, date.getDate())}
    </div>)
  },
  
  render() {
    return (<div><form onSubmit={this.onSave}>
      <div className="dialog-body-div">
        <input type="text" ref="placeName"  placeholder="Name of Location" />
        <textarea          ref="placeNotes" placeholder="Notes about the Location" />
        <div style={{ height: "1em" }} />
        {this.dateBoxes()}
        <input type="text" ref="forayName"  placeholder="Name of Foray" />
        <textarea          ref="forayNotes" placeholder="Notes about the Foray" />
        <button ref="save" type="submit" value="save">S A V E</button>
      </div>
    </form></div>)
  }
})
