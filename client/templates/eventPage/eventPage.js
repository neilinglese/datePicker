

Template.eventPage.onRendered(function(){
    /*Get all members dates from dates collection*/
    var allMembersDatesInfo = Dates.find({event_id: this.data._id}).fetch();
    //variable for opacity divided by number of event members
    var opacityPerMember = 1/allMembersDatesInfo.length;
    var allMembersDates = [];
    var eventData =[];

    //for each allMembersDates get the memberDatesPicked and store in array
    $.each(allMembersDatesInfo, function(index, value){
        //set variable for each dates object in allMembersDatesInfo
        var individual = allMembersDatesInfo[index]['memberDatesPicked'];
        //loop through each object and push memberDates to allMembersDates array
        $.each(individual, function(index, value){
            allMembersDates.push(value);
        })
    });

    console.log(allMembersDates);
    var sorted = allMembersDates.sort();

    console.log(sorted);

    var repeatNumber = function(array, elem){
        var count = 0;
        for(var i = 0; i < array.length; i++){
            if(array[i] === elem){
                count++;
            }
        }
        //push all to array
        return [elem, count];
    };

    //loop through allMembersDates array 
    for(var i = 0; i < allMembersDates.length; i++){
        eventData.push(repeatNumber(sorted, allMembersDates[i]));
    }
    
    console.log(eventData);

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
                $("td[data-date='"+value[0]+"']").addClass('toggleOn').css('opacity', opacityPerMember*value[1]);
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
