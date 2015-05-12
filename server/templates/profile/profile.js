Meteor.methods({
    updateemailfunction: function (email) {

        var hasEmailBeenTaken = Meteor.users.findOne({'emails': {$elemMatch: {address: {$regex : new RegExp(email,"i")}}}});

        if(hasEmailBeenTaken == null || hasEmailBeenTaken._id == Meteor.user()._id)
        {
            return Meteor.users.update({_id:Meteor.user()._id}, {$set: {'emails.0.address': email}});
        }
        else{
            return false;
        }
    }
});