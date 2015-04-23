var targetMonthYear;
var prevMonth;
var nextMonth;
var eventData = [];


Template.pickDates.onRendered(function(){
    //get reference to the div #pickDatesCal
    var $calContainer = $('#pickDatesCal');
	//get the target month and year from db
	targetMonthYear = this.data.eventMonthYear;

	var targetMoment = moment(targetMonthYear);

	var prevChosenMoment = moment(targetMonthYear).subtract(1, 'M');

	var nextChosenMoment = moment(targetMonthYear).add(1, 'M');

    var calendar = $calContainer.fullCalendar({
    	header:{
    		today: false,
    		left: 'prev',
    		right: 'next',
    		center: 'title'
    	},
    	defaultDate: targetMonthYear,
    	/*dayRender function handling the intial rendering of days on page load*/
        dayRender: function (date, cell) {
            /*For each item in the eventData onLoad adding the toggleOn class*/
            $.each(eventData,function(index,value){
                $("td[data-date='"+value+"']").addClass('toggleOn');
            });
        },
        viewRender: function(view, element){
            var calCurrent = $calContainer.fullCalendar('getDate');
            if(calCurrent < prevChosenMoment){
                $calContainer.fullCalendar('gotoDate', prevChosenMoment);
            }
            if(calCurrent > nextChosenMoment){
                $calContainer.fullCalendar('gotoDate', nextChosenMoment);
            }
        },
		dayClick:function(date,jsEvent,view){
	        /*OnClick storing day in DayClicked in a format of YYYY-MM-DD*/
	        var DayClicked =  $.fullCalendar.moment(date).format('YYYY-MM-DD');
	        $(this).toggleClass( "toggleOn" );
	        /*If the day has a class of toggleOn pusinh into the eventData array else looping array and removing it*/
	        if($(this).hasClass("toggleOn"))
	        {
	            console.log('On');
	            eventData.push(DayClicked);
	        }else{
	            console.log('Off');
	            for(var z = eventData.length; z--;) {
	                if (eventData[z] === DayClicked) {
	                    eventData.splice(z, 1);
	                }
	            }
	        }
	        console.log(eventData);
        }//closes dayClick

    })//closes calendar

});//closes onRendered

Template.pickDates.events({

});

Template.pickDates.helpers({

});

