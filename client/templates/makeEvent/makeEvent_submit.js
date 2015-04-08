/*setup of eventData array, declaring global here so i can edit it in the render and edit events section */
var eventData = [];

//comment this out
var groupMembers = [];
//uncomment this out and put a userid from friends page here preferably not you own
//var groupMembers = [put a user id here];
//Example: var groupMembers = ['mshaWX4DthpcE7sNj','dCjc8seD3LiMdiv5j'];

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
        return Meteor.users.find({ _id: { $in: Meteor.user().friends } })
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
            'dates': eventData,
            'groupMembers':groupMembers
        };
        /*resetting the eventData array*/
        eventData = [];
        groupMembers = [];
        /*logging the eventData array*/
        console.log(eventData);
        newEvent._id = Events.insert(newEvent);
        Session.set('newEventId', newEvent._id);
        Router.go('eventPage', newEvent);
        Notifications.success(newEvent.eventName, 'New Event was Created successfully');
    },

    //STILL WORKING ON THIS NO DATA IS BEING PUSHED YET INTO EVENTS
    'click .addBtn': function(e) {
        e.preventDefault();
        var thisId = this._id;

        console.log(e.target);

        if($(event.target).hasClass("toggleOn"))
        {
            console.log('friend on');
            groupMembers.push(this._id);
        }else{
            console.log('friend Off');
            for(var z = groupMembers.length; z--;) {
                if (groupMembers[z] === this._id) {
                    groupMembers.splice(z, 1);
                }
            }
        }

        console.log(groupMembers);


        //Need to check array and if it contains the id remove it, else add it
        //that will allow for toggling on who to invite
    }

});