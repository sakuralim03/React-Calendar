var helpers = {

  createDropdownTimes: function createDropdownTimes() {
    var dropDownTimes = ['12:00 am', '12:15 am', '12:30 am', '12:45 am'];
    for(var i = 1; i < 12; i++) {
      for(var j = 0; j < 60; j+= 15) {
        dropDownTimes.push(i + ':' + (j === 0 ? j + '0' : j) + ' am')
      }
    }
    dropDownTimes.push('12:00 pm', '12:15 pm', '12:30 pm', '12:45 pm');
    for(var i = 1; i < 12; i++) {
      for(var j = 0; j < 60; j+= 15) {
        dropDownTimes.push(i + ':' + (j === 0 ? j + '0' : j) + ' pm')
      }
    }
    return dropDownTimes
  },

  convertTo12Hr: function convertTo12Hr(militaryTime) {
    if(Number(militaryTime) < 100) {
      return '12:0' + Number(militaryTime) + ' am'
    }
    if(Number(militaryTime) < 1000) {
      return[militaryTime.slice(1, 2), ':', militaryTime.slice(2)].join('') + ' am';
    } 
    if(Number(militaryTime) < 1200) {
      return[militaryTime.slice(0, 2), ':', militaryTime.slice(2)].join('') + ' am';
    }
    else {
      if(Number(militaryTime) < 1300) {
        return '12:0' + (Number(militaryTime) - 1200) + ' pm'
      }
      var convert = '0' + (Number(militaryTime) - 1200).toString();
      console.log(convert)
      if(Number(convert) < 1000) {
        return[convert.slice(1, 2), ':', convert.slice(2)].join('') + ' pm';
      }
      return[convert.slice(1, 3), ':', convert.slice(3)].join('') + ' pm';
    }
  },

  convertToMil: function convertToMil(twelveHr) {
    // am conversion
    if(twelveHr[1] === ':' && twelveHr[twelveHr.length - 2] === 'a') {
      return '0' + twelveHr[0] + twelveHr[2] + twelveHr[3]
    } 
    if(twelveHr[twelveHr.length - 2] === 'a') {
      return twelveHr[0] + twelveHr[1] + twelveHr[3] + twelveHr[4]
    }
    // pm conversion
    if(twelveHr[1] === '2') {
      return '12' + twelveHr[3] + twelveHr[4];
    }
    return (Number(twelveHr.split(":")[0]) + 12).toString() + twelveHr.split(":")[1][0] + twelveHr.split(":")[1][1]
  },

  isReservedBlock: function isReservedBlock(time, arr, day) {
    for(var i = 0; i < arr.length; i++) {
      if(Number(arr[i].start) <= Number(time) && Number(arr[i].end) >  Number(time) && day === arr[i].day) {
        return true;
      }
    }
    return false;
  },

}

export default helpers;