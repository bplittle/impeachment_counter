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
        <div>years: {this.state.years} </div>
        <div>days: {this.state.days} </div>
        <div>hours: {this.state.hours} </div>
        <div>minutes: {this.state.minutes} </div>
        <div>seconds: {this.state.seconds} </div>
      </div>
    );
  }
}
