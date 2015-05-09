Template.friends.rendered = function() {
    Session.set('searchResults',null);
};


Template.friends.events({
    'submit form' : function(e) {
        e.preventDefault(); //prevent page reload
        var email = event.target.Email.value;
        Meteor.call('get_users_by_email',email,function(error,userid){
            Session.set('searchResults',userid)
        });
    },
    'click .addBtn': function(e) {
        e.preventDefault();
        var userToBeAdded = Session.get('searchResults')._id;
        Meteor.users.update({_id: Meteor.user()._id}, {
            $addToSet: {
                "friends": userToBeAdded
            }
        });

    }


});

Template.friends.helpers({

    userNotFriend: function() {
        var user = Meteor.user();

        // not any friends yet for this profile, so of course they can't be friends
        if (! user || ! user.friends) {
            return true;
        }

        return Meteor.user().friends.indexOf(Session.get('searchResults')._id) <= -1;
    },

    getResults : function(){
        return Session.get('searchResults');
    }
});
