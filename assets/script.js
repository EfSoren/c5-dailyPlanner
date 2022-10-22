//General variables
var $root = $(":root")
var start = 9
var end =19
var textEntries = []
var timeBar = []





//creates schedule table elements
for (var i = start; i < end; i++) {
    var hour = i   
    if (hour > 12){
        hour -= 12 
    }

    var hourlyRow = $('<div>').addClass('row').attr('id', i)

    var curDate = moment().format("MMM Do YYYY")
    var displayDate = $('.today').text(curDate)

    var listTime = $("<div>").addClass('hour col-2').text(hour)

    var notes = $("<textarea>").addClass('note col-8').text(9).attr('data-id', i).val(textEntries[i])
    timeBar.push(notes)
    var saveBtn = $("<button>").addClass('save col-2').attr('data-id', i).text('save')

    hourlyRow.append(listTime, notes, saveBtn);
    $('.container').append(hourlyRow)
    console.log();
}

// checks current time and colors rows depending on if they are past present or future
function timeBackSetter(){
var currentTime = moment().format('HH') * 10
for (let index = 0; index < timeBar.length; index++) {
 
    if (timeBar[index].attr('data-id') * 10 < currentTime){
            timeBar[index].css('background-color', 'lightcoral')
    }else if (timeBar[index].attr('data-id') *10 == currentTime){
            timeBar[index].css('background-color', 'beige')
    }else if (timeBar[index].attr('data-id') *10 > currentTime){
            timeBar[index].css('background-color', 'lightgreen')
        }
    }
}
timeBackSetter()

//clicking save button sends info to local storage
function saveData(){
    for (let i = 0; i < (end-start); i++) {
        var lsName = `${timeBar[i].attr('data-id')}key`
        var notesV = timeBar[i].val() 
        localStorage.setItem(lsName, `${notesV}`)
    }
}
$root.on('click', '.save', saveData)

//loads local storage data to table
for (let i = 0; i < (end-start); i++) {
    var oldData = localStorage.getItem(`${i+9}key`)
    timeBar[i].val(oldData)
  
    
}


