// Your code here
function createEmployeeRecord(inputArr) {
    const newObj = {
        firstName: inputArr[0],
        familyName: inputArr[1],
        title: inputArr[2],
        payPerHour: inputArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
    return newObj
}

function createEmployeeRecords(inputArrs) {
    const newRecord = inputArrs.map(createEmployeeRecord)
    return newRecord
}

function createTimeInEvent(employeeRecord, dateStamp){
    const [datePart, timePart] = dateStamp.split(' ');
    const hours = parseInt(timePart.substring(0, 4), 10);
    const timeInEvent = {
        type: "TimeIn",
        hour: hours,
        date: datePart
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [datePart, timePart] = dateStamp.split(' ');
    const hours = parseInt(timePart.substring(0, 4), 10);
    const timeOutEvent = {
        type: "TimeOut",
        hour: hours,
        date: datePart
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    const timeInEvent = employeeRecord["timeInEvents"].find(event => event.date === dateStamp);
    const timeOutEvent = employeeRecord["timeOutEvents"].find(event => event.date === dateStamp);
    
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    const hours = hoursWorkedOnDate(employeeRecord, dateStamp)
    const wages = hours* employeeRecord["payPerHour"]
    return wages
}


function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    const totalWages = datesWorked.reduce((acc, date) => {
      return acc + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((acc, employeeRecord) => {
      const totalWages = allWagesFor(employeeRecord);
  
      return acc + totalWages;
    }, 0);
  
    return totalPayroll;
  }
  