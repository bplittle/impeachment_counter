class Index extends React.Component {

  constructor(props) {
    super(props);
    let inaugDate = new Date('January 20, 2017');
    let date = new Date();
    let month = String(date.getMonth() + 1).length > 1 ? ((date.getMonth() + 1) % 12) : `0${((date.getMonth() + 1) % 12)}`;
    let day = String(date.getDate()).length > 1 ? date.getDate() : `0${date.getDate()}`;
    let formattedDate = `${date.getFullYear()}-${month}-${day}`;
    let int = Math.floor(Math.random() * 4);

    this.state = {
      inaugDate: inaugDate,
      // diff: 0,
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      remainder: 0,
      date: formattedDate,
      randomInt: int,
    };
    // binding this
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.clearValues = this.clearValues.bind(this);
    this.message = this.message.bind(this);
    this.randomFunc = this.randomFunc.bind(this);
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

  addZeroes(lengthDiff, string) {
    for(let i = 0; i < lengthDiff; i++) {
      string = '0' + string;
    }
    return string;
  }

  setYears() {
    let yearInMs = 31556952000;
    let years = String(Math.floor(this.state.remainder / yearInMs));
    let remainder = this.state.remainder % yearInMs;
    this.setState({years: years, remainder: remainder}, this.setDays);
  }

  setDays() {
    let dayInMs = 86400000;
    let days = String(Math.floor(this.state.remainder / dayInMs));
    let remainder = this.state.remainder % dayInMs;
    this.setState({days: days, remainder: remainder}, this.setHours);
  }

  setHours() {
    let hourInMs = 3600000;
    let hours = String(Math.floor(this.state.remainder / hourInMs));
    let lengthDiff = 2 - hours.length;
    hours = this.addZeroes(lengthDiff, hours);
    let remainder = this.state.remainder % hourInMs;
    this.setState({hours: hours, remainder: remainder}, this.setMinutes);
  }

  setMinutes() {
    let minutesInMs = 60000;
    let minutes = String(Math.floor(this.state.remainder / minutesInMs));
    let lengthDiff = 2 - minutes.length;
    minutes = this.addZeroes(lengthDiff, minutes);
    let remainder = this.state.remainder % minutesInMs;
    this.setState({minutes: minutes, remainder: remainder}, this.setSeconds);
  }

  setSeconds() {
    let secondsInMs = 1000;
    let seconds = String(Math.floor(this.state.remainder / secondsInMs));
    let lengthDiff = 2 - seconds.length;
    seconds = this.addZeroes(lengthDiff, seconds);
    let remainder = this.state.remainder % secondsInMs;
    this.setState({seconds: seconds, remainder: remainder});
  }

  randomFunc() {
    let that = this;
    let int = Math.floor(Math.random() * 4);
    let audioUrl = that.props.audio_urls[Math.floor(Math.random()*that.props.audio_urls.length)]
    let audio = new Audio(audioUrl);
    setTimeout(function() {
        that.setState({activeFace: true});
    }, 100);
    setTimeout(function() {
      audio.play();
    }, 300);
    setTimeout(function() {
        that.setState({activeFace: false});
    }, 2250);
    setTimeout(function() {
        that.setState({randomInt: int});
    }, 3000);

  }




  formSubmit(e) {
    e.preventDefault();
    let dataHash = {
      date: this.state.date,
      time: this.state.time,
      name: this.state.name,
      email: this.state.email,
    }
    let that = this;
    $.ajax({
      type: 'POST',
      url: '/entrants',
      data: dataHash,
      dataType: 'json',
      success: r => {
        that.clearValues();
        that.message('success');
        that.randomFunc();
        that.setState({entered: true});
      }, error: r => {
        let errorMessage = JSON.parse(r.responseText).message;
        that.message('error', errorMessage);
      }
    })
  }

  clearValues() {
    this.setState({
      date: null,
      time: null,
      name: null,
      email: null,
    })
  }

  message(type, text='There was a problem processing your entry') {
    let that = this;
    that.setState({message: type, messageText: text});
    setTimeout(function() {
      if(that.state.message === type) {
        that.setState({message: null});
      }
    }, 5000)
  }

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    let message;
    if(this.state.message === 'success') {
      message = <div className="submit-message blue">Guess received</div>;
    } else if(this.state.message === 'error') {
      message = <div className="submit-message red">{this.state.messageText}</div>;
    }

    let submitText = this.state.entered ? 'Entered' : 'Enter now';
    let trumpAgain = this.state.entered ? <button className="btn btn-success" onClick={this.randomFunc} disabled={this.state.activeFace}>Trump Again?</button> : '';

    let activeFace = this.state.activeFace ? 'active' : '';
    let faceType = this.state.randomInt !== null ?  `type-${this.state.randomInt}` : '';
    let faceClass=`${faceType} ${activeFace}`;
    return (
      <div className="container">
        <div id="header">
          <h2><span className="red">IMPEACHMENT</span> <span className="blue">COUNTER</span></h2>
          <h3 className="white">How Long Will He Last?</h3>
        </div>
        <div id="trump-countdown">
          <h1 className="red"> {this.state.years}</h1>
          <img src={this.props.tie_url} className="tie" id="first-tie"/>
          <h1 className="blue"> {this.state.days}</h1>
          <img src={this.props.tie_url} className="tie" />
          <h1 className="white"> {this.state.hours}</h1>
          <img src={this.props.tie_url} className="tie" />
          <h1 className="blue"> {this.state.minutes}</h1>
          <img src={this.props.tie_url} className="tie" />
          <h1 className="red"> {this.state.seconds} </h1>
        </div>
        <div id="vote-box" className="row">
          <form action="/" onSubmit={this.formSubmit}>
            <div className="col-xs-12"><h3 className="white">Place Your Vote</h3></div>
            <div className="col-xs-12" id="message">{message}</div>
            <div className="col-sm-6 col-xs-12">
              <label>Date</label>
              <input name="date" type="date" className="form-control" required value={this.state.date} onChange={this.handleChange}/>
            </div>
            <div className="col-sm-6 col-xs-12">
              <label>Time</label>
              <input name="time" type="time" className="form-control" required value={this.state.time} onChange={this.handleChange}/>
            </div>
            <div className="col-sm-6 col-xs-12">
              <label>Name</label>
              <input name="name" type="text" className="form-control" required value={this.state.name} onChange={this.handleChange}/>
            </div>
            <div className="col-sm-6 col-xs-12">
              <label>Email</label>
              <input name="email" type="email" className="form-control" required value={this.state.email} onChange={this.handleChange}/>
            </div>
            <div className="col-xs-12">
              <input className="btn btn-primary" id="enter-button" value={submitText} type="submit" disabled={this.state.entered}/>
              {trumpAgain}
            </div>
          </form>
          <img src={this.props.hair_url} id="hair"/>
        </div>
        <div id="trump-face" className={faceClass}></div>
      </div>
    );
  }
}
