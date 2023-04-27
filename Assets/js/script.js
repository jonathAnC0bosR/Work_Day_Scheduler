// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentDay = $('#currentDay');
var currentHour = $('#currentHour');
var saveBtnEl = $('.saveBtn');
var descriptionEl = $('textarea');
var clearBtnEl = $('.clearBtn');


$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    
    saveBtnEl.on('click', function(event){
        event.preventDefault();
        var parentDiv = $(this).closest('[id]');
        var hour = parentDiv.attr('id').split('-')[1];
        var eventDescription = parentDiv.find('textarea').val();
        localStorage.setItem('hour-' + hour, eventDescription);
    })

    // Code to clear storage and empty all textareas

    clearBtnEl.on('click', function(event) {
        event.preventDefault();
        localStorage.clear('hour-');
        descriptionEl.val('');
    })
    

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    var ids = [];
    var number;
    var divId = $('div[id^="hour-"]');
    divId.each(function() {
        var id = $(this).attr('id');
        number = id.split('-')[1];
        ids.push(number);
    })
    
   


    for(var i = 0; i <= ids.length; i++) {
        var todayNumber = parseInt(dayjs().format('H'));
        var hourNumber = parseInt(ids[i]);
        if(hourNumber - todayNumber > 0 ) {
            $(divId[i]).addClass('future');
        } else if (hourNumber === todayNumber ) {
            $(divId[i]).addClass('present');
        } else {
            $(divId[i]).addClass('past');
        }

    }

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

    
        for (var i = 9; i <= 17; i++) {
            var key = 'hour-' + i;
            var eventDescription = localStorage.getItem(key);
            if(eventDescription){
                $('#hour-' + i + ' textarea').val(eventDescription);
            }
        }
    
    






    // TODO: Add code to display the current date in the header of the page.
    var today = dayjs();
    currentDay.text(today.format('MMMM D, YYYY'));
    currentHour.text(today.format('HH:mm:ss'));
  });