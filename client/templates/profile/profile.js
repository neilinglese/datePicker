Template.profile.rendered = function() {

};
Template.profile.events({
    'submit': function(event){
        event.preventDefault();
        var username = event.target.userName.value;
        var lastname = event.target.lastName.value;
        var email = event.target.Email.value;
        Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.name":username}});
        Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.lastname":lastname}});
        Meteor.users.update({_id:Meteor.user()._id}, {$set:{"emails":[{"address":email}]}});
    }});