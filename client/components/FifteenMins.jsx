import React from 'react';

class FifteenMins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlock: this.props.isBlock
    };
    this.alterBlock = this.alterBlock.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      isBlock: newProps.isBlock,
    })
  }

  alterBlock(e) {
    this.setState({
      isBlock: true/*!this.state.isBlock*/
    })
    this.props.createBlock(e)
  }
  
  render() {
    return (
      <div id={this.props.id} className='fifteen-min-block' onClick={this.alterBlock} style={this.state.isBlock ? {backgroundColor:'#B3E5FC', borderLeft:'3px solid #03A9F4'} : {}}>{this.state.isBlock && this.props.reservationBlocks.map(start => start.start).indexOf(this.props.id) !== -1 ? 'Reserved' : ''}</div>
    )
  }
}

export default FifteenMins;