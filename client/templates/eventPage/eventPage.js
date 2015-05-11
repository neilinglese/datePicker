

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

    var sorted = allMembersDates.sort();

    var repeatNumber = function(array, elem, nextElem, prevElem){
        var count = 0;
        var firstInstance;
        for(var i = 0; i < array.length; i++){
            /*Check to make sure current array element matches elem and increment count.  
            if elem is the same as the nextElem but not the same as the prevElement 
            firstInstance is true*/
            if(array[i] === elem && elem === nextElem && elem !== prevElem){
                count++;
                firstInstance = true;
            /*Check to make sure current array element matches elem and increment count.
            if elem is the same as the prevElem firstInstance is false*/
            }else if(array[i] === elem && elem === prevElem){
                count++;
                firstInstance = false;
            /*Check to make sure current array element matches elem and increment count.
            If elem is not the same as the prevElem and is not the same as the nextElem
            firstInstance is true*/
            }else if(array[i] === elem && elem !== prevElem && elem !== nextElem){
                count++;
                firstInstance = true;
            }
        }
        //push all to array
        return [elem, count, firstInstance];
    };

    //loop through allMembersDates array 
    for(var i = 0; i < allMembersDates.length; i++){
        eventData.push(repeatNumber(sorted, allMembersDates[i], allMembersDates[i+1], allMembersDates[i-1]));
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
