Template.friends.rendered = function() {
};


Template.friends.events({'submit form' : function(event, template) {
    event.preventDefault(); //prevent page reload
    var email = event.target.Email.value;
    var result = {
        'result' : Meteor.users.find({ "emails.address" : email })
    };

    console.log(result);

},
    'click .addBtn': function(e) {
        e.preventDefault();
        var thisId = this._id;
        console.log(thisId);


        Meteor.users.update({_id: Meteor.user()._id}, {
            $addToSet: {
                "friends": thisId
            }
        });

    }


});

Template.friends.helpers({

    userDirectory: function () {
        return Meteor.users.find();
    },

    userNotFriend: function() {
        var user = Meteor.user();

        // not any friends yet for this profile, so of course they can't be friends
        if (! user || ! user.friends) {
            return true;
        }

        if(Meteor.user().friends.indexOf(this._id) > -1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
});
