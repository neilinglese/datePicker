Meteor.methods({
   'get_users_by_email': function(email){
       return Meteor.users.findOne({emails: {$elemMatch: {address:email}}},
           {fields: {
               '_id': 1,
               'profile.name': 1,
               'profile.lastname': 1,
               'profile.about': 1,
               'emails':1,
               'emails[0].address': 1
           }});
   }

});