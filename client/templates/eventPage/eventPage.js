

Template.eventPage.onRendered(function(){
    /*Get all members dates from dates collection*/
    var allMembersDates = Dates.find({event_id: this.data._id}).fetch();
    //variable for opacity divided by number of event members
    var opacity = 1/allMembersDates.length;
    console.log(opacity);
    
    var eventData = this.data.dates;
    //get reference to the targetMonthYear
    var targetMonthYear = this.data.eventMonthYear;   
    //get reference to the #eventCalendar 
    var $calContainer = $('#eventCalendar'); 
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
    })
});

Template.eventPage.helpers({



});

Template.eventPage.events({
    'click #pickDatesBtn': function(){
    Router.go('pickDates', {_id:this._id});     
    }
});
