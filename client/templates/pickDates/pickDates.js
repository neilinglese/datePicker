
Template.pickDates.onRendered(function(){
	//get the target month and year from db
	var targetMonthYear = moment(this.data.eventMonthYear);
	//get previous Month
	var prevMonth = moment(this.data.eventMonthYear).subtract(1, 'M');
	//get next Month
	var nextMonth = moment(this.data.eventMonthYear).add(1, 'M');
	console.log(prevMonth);
	console.log(targetMonthYear);
	console.log(nextMonth);

    /*Getting Event data from iron-router and storing it into an array*/
    var eventData = this.data.dates;


    somePeople = this.data.groupMembers;

    Session.set('somePeople', this.data.groupMembers);

    var calendar = $('#pickDatesCal').fullCalendar({
    	defaultDate: targetMonthYear,
    	start: prevMonth,
    	end: nextMonth,
        /*dayRender function handling the intial rendering of days on page load*/
        dayRender: function (date, cell) {
            /*For each item in the eventData onLoad adding the toggleOn class*/
            $.each(eventData,function(index,value){
                $("td[data-date='"+value+"']").addClass('toggleOn');
            });
        }
    })
});