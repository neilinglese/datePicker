Template.profile.rendered = function() {
};

Template.profile.events({
    'submit': function(event){
        event.preventDefault();
        var username = event.target.userName.value;
        var lastname = event.target.lastName.value;
        var about = document.getElementById("about").value;
        var email = event.target.Email.value;
        Meteor.call('updateemailfunction', email);
        Meteor.users.update({_id:Meteor.user()._id}, {$set:{
            "profile.firstname":username,
            "profile.lastname":lastname,
            "profile.about":about
        }});
        Notifications.success('Profile Updated', 'Your information was updated successfully');
    }
});

