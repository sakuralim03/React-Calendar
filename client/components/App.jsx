import React from 'react';
import '../../style.css';
import WeekRow from './WeekRow.jsx'
import Modal from 'react-modal';
import helpers from './Helpers';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '300px'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      twelveHrStart: '',
      twelveHrEnd: '',
      reservationBlocks: [],
      reservationBlock: {
        start: '',
        end: '',
      }
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setStartEnd = this.setStartEnd.bind(this);
    this.enterStart = this.enterStart.bind(this);
    this.enterEnd = this.enterEnd.bind(this);
    this.saveBlock = this.saveBlock.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  setStartEnd(e) {
    this.setState({
      twelveHrStart: helpers.convertTo12Hr(e.target.id[0] + e.target.id[1] + '00'),
      twelveHrEnd: helpers.convertTo12Hr(
        (Number(e.target.id[0] + e.target.id[1]) + 1) < 10 ? 
          '0' + (Number(e.target.id[0] + e.target.id[1]) + 1).toString() + '00' : 
          (Number(e.target.id[0] + e.target.id[1]) + 1).toString() + '00'
      ),
      reservationBlock: {
        day: e.target.parentElement.id,
        start: e.target.id[0] + e.target.id[1] + '00',
        end: (Number(e.target.id[0] + e.target.id[1]) + 1) < 10 ? 
          '0' + (Number(e.target.id[0] + e.target.id[1]) + 1).toString() + '00' : 
          (Number(e.target.id[0] + e.target.id[1]) + 1).toString() + '00',
      }
    })
    this.openModal();
  }

  enterStart(e) {
    this.setState({
      twelveHrStart: e.target.value,
      reservationBlock: {
        start: helpers.convertToMil(e.target.value),
        end: this.state.reservationBlock.end,
        day: this.state.reservationBlock.day,
      }
    })
  }

  enterEnd(e) {
    this.setState({
      twelveHrEnd: e.target.value,
      reservationBlock: {
        end: helpers.convertToMil(e.target.value),
        start: this.state.reservationBlock.start,
        day: this.state.reservationBlock.day,
      }
    })
  }

  saveBlock() {
    this.setState({
      reservationBlocks: this.state.reservationBlocks.concat(this.state.reservationBlock)
    })
    this.closeModal()
  }

  render() {
    return (
      <div>
        <div className="header-box">
          <div className="title">Enter Available Times</div>
        </div>
        <div className='header-box calendar-day-border'>
          <div className='calendar-day'><span className="week-day">Sunday</span></div>
          <div className='calendar-day'><span className="week-day">Monday</span></div>
          <div className='calendar-day'><span className="week-day">Tuesday</span></div>
          <div className='calendar-day'><span className="week-day">Wednesday</span></div>
          <div className='calendar-day'><span className="week-day">Thursday</span></div>
          <div className='calendar-day'><span className="week-day">Friday</span></div>
          <div className='calendar-day'><span className="week-day">Saturday</span></div>
        </div>
        <div className='calendar-box'>
          <div className='times-container'>
            {['1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', 
            '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', 
            '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm', '12 am'].map((time) => {
              return <div className='time-text'>{time}</div>
            })}
          </div>
          <div className='week-row-container'>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day)=>{
              return <WeekRow day={day} setStartEnd={this.setStartEnd} reservationBlocks={this.state.reservationBlocks}/>
            })}
          </div>
        </div>
        <div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
 
         {/* <h2 ref={subtitle => this.subtitle = subtitle}></h2> */}
         <h2 class="modal-header">Reserve an Event</h2>
         <hr></hr>
          <form style={{display:'flex', flexFlow:'column wrap'}}>
            <div class="modal-label">Start Time</div>
            <select class= "modal-select" id='start' value={this.state.twelveHrStart} onChange={this.enterStart}>
              {helpers.createDropdownTimes().map((ddTime) => {
                return <option>{ddTime}</option>
              } )}
            </select>
            <br></br>
            <div class="modal-label">End Time</div>
            <select class="modal-select" id='end' value={this.state.twelveHrEnd} onChange={this.enterEnd}>
              {helpers.createDropdownTimes().map((ddTime) => {
                return <option >{ddTime}</option>
              } )}
            </select>
            <br></br>
          </form>
          <hr></hr>
          <div class= "modal-btns">
            <button class="btn btn-secondary" onClick={this.closeModal}>Close</button>
            <button class="btn btn-primary"onClick={this.saveBlock}>Save</button>
          </div>
        </Modal>
      </div>
      </div>
    )
  }
}

export default App;