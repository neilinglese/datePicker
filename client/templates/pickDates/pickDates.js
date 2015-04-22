var targetMonthYear;
var prevMonth;
var nextMonth;
var eventData = [];


Template.pickDates.onRendered(function(){
	//get the target month and year from db
	targetMonthYear = this.data.eventMonthYear;
	Session.set('calendarTarget', targetMonthYear);
	var currentMoment = moment(targetMonthYear);

	var prevChosenMoment = moment(targetMonthYear).subtract(1, 'M');

	var nextChosenMoment = moment(targetMonthYear).add(1, 'M');

	var endNextMoment = moment(targetMonthYear).add(2, 'M');
		console.log(endNextMoment);

    var calendar = $('#pickDatesCal').fullCalendar({
    	header:{
    		today: false,
    		left: 'prevMonth',
    		right: 'nextMonth',
    		center: 'title targetMonth'
    	},
    	views: {
 			prevMonth:{
 				type: 'month',
 				duration: { months: 1},
 				start: moment(targetMonthYear).subtract(1, 'M'),
 				end: moment(targetMonthYear),
 				intervalStart: moment(targetMonthYear).subtract(1, 'M'),
 				intervalEnd: moment(targetMonthYear)
 			}, 
 			targetMonth:{
 				type:'month',
 				duration: {months: 1},
 				start: currentMoment,
 				end: nextChosenMoment,
 				intervalStart: currentMoment,
 				intervalEnd: nextChosenMoment
 			},
 			nextMonth:{
 				type: 'month',
 				duration: {months: 1},
 				start: nextChosenMoment,
 				end: endNextMoment,
 				intervalStart: nextChosenMoment,
 				intervalEnd: endNextMoment
 			}
 		},
    	defaultDate: targetMonthYear,
    	        /*dayRender function handling the intial rendering of days on page load*/
        dayRender: function (date, cell) {
            /*For each item in the eventData onLoad adding the toggleOn class*/
            $.each(eventData,function(index,value){
                $("td[data-date='"+value+"']").addClass('toggleOn');
            });
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

	'click .fc-prev-button': function(){
		var $this = $(this);

    	/*var thisEvents = $._data($this[0], "events");*/
    	var chosenDate = Session.get('calendarTarget');//date object
    	var chosenMoment = moment(chosenDate);//date converted to moment

    	var prevChosenMoment = moment(chosenDate).subtract(1, 'M');
    	var prevChosenDate = prevChosenMoment.toDate();
    	console.log(prevChosenDate);
    	Session.set('prevChosenDate', prevChosenDate);
    	var calCurrent = $('#pickDatesCal').fullCalendar('getDate');

    	if(calCurrent.isSame(prevChosenMoment)){
    		/*console.log(thisEvents);
    		$this.unbind('click');
    		console.log(thisEvents);*/
    		$('#pickDatesCal').fullCalendar('gotoDate', Session.get('prevChosenDate'));
    		$('#pickDatesCal').fullCalendar('render');

    	}
	}

});

Template.pickDates.helpers({

});

