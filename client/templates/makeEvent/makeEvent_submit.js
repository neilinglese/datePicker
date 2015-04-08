/*setup of eventData array, declaring global here so i can edit it in the render and edit events section */
var eventData = [];

Template.makeEvent.rendered = function() {
    /*Rendering Calendar and handling click events*/
    var calendar = $('#eventCalendar').fullCalendar({
        /*DayClick function handling day clicking*/
        dayClick:function(date,allDay,jsEvent,view){
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
            /*Just logging the dayClicked and the array to check for errors*/
            console.log(DayClicked);
            console.log(eventData);
        }
    })
};

Template.makeEvent.helpers({
    friends: function () {
        return Meteor.users.find({ _id: { $in: Meteor.user().profile.friends } })
    }
});
Template.makeEvent.events({
    /*Submit function, taking data from page eventName, description, and the array of eventData
     * and storing it to the Events collection tied to the userID*/
    'submit form': function(e){
        e.preventDefault();
        var eventDescription = document.getElementById("eventDescription").value;
        var newEvent = {
            'userId': Meteor.userId(),
            'eventName': $(e.target).parent().find('#eventName').val(),
            'description': eventDescription,
            'dates': eventData
        };
        /*resetting the eventData array*/
        eventData = [];
        /*logging the eventData array*/
        console.log(eventData);
        newEvent._id = Events.insert(newEvent);
        Session.set('newEventId', newEvent._id);
        Router.go('eventPage', newEvent);
        Notifications.success(newEvent.eventName, 'New Event was Created successfully');
    }
});