class Index extends React.Component {

  constructor(props) {
    super(props);
    let inaugDate = new Date('January 20, 2017');
    this.state = {
      inaugDate: inaugDate,
      // diff: 0,
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      remainder: 0,
    };
  }

  componentDidMount() {
    this.setTimeSince();
  }

  setTimeSince() {
    let diff = new Date() - this.state.inaugDate
    this.setState({remainder: diff}, this.setYears);

    setTimeout(() => {
      this.setTimeSince();
    }, 1000)

  }

  setYears() {
    let yearInMs = 31556952000;
    let years = Math.floor(this.state.remainder / yearInMs);
    let remainder = this.state.remainder % yearInMs;
    this.setState({years: years, remainder: remainder}, this.setDays);
  }

  setDays() {
    let dayInMs = 86400000;
    let days = Math.floor(this.state.remainder / dayInMs);
    let remainder = this.state.remainder % dayInMs;
    this.setState({days: days, remainder: remainder}, this.setHours);
  }

  setHours() {
    let hourInMs = 3600000;
    let hours = Math.floor(this.state.remainder / hourInMs);
    let remainder = this.state.remainder % hourInMs;
    this.setState({hours: hours, remainder: remainder}, this.setMinutes);
  }

  setMinutes() {
    let minutesInMs = 60000;
    let minutes = Math.floor(this.state.remainder / minutesInMs);
    let remainder = this.state.remainder % minutesInMs;
    this.setState({minutes: minutes, remainder: remainder}, this.setSeconds);
  }

  setSeconds() {
    let secondsInMs = 1000;
    let seconds = Math.floor(this.state.remainder / secondsInMs);
    let remainder = this.state.remainder % secondsInMs;
    this.setState({seconds: seconds, remainder: remainder});
  }

  render() {
    return (
      <div className="container">
        <div id="header">
          <h2>Impeachment Counter</h2>
          <h3>How Long Will He Last?</h3>
        </div>
        <div id="trump-countdown">
          <h1> {this.state.years}</h1>
          <h1>:</h1>
          <h1> {this.state.days}</h1>
          <h1>:</h1>
          <h1> {this.state.hours}</h1>
          <h1>:</h1>
          <h1> {this.state.minutes}</h1>
          <h1>:</h1>
          <h1> {this.state.seconds} </h1>
        </div>
        <div id="vote-box">
          <div className="col-xs-12"><h3>Place Your Vote</h3></div>
          <div className="col-sm-6 col-xs-12">
            <label>Date</label>
            <input name="date" type="date" className="form-control"/>
          </div>
          <div className="col-sm-6 col-xs-12">
            <label>Time</label>
            <input name="time" type="time" className="form-control"/>
          </div>
          <div className="col-sm-6 col-xs-12">
            <label>Name</label>
            <input name="time" type="text" className="form-control"/>
          </div><div className="col-sm-6 col-xs-12">
            <label>Email</label>
            <input name="email" type="email" className="form-control"/>
          </div>
        </div>
      </div>
    );
  }
}
