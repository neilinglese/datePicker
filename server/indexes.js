// make sure there can be no duplicate email addresses
Meteor.users._ensureIndex({'emails.0.address': 1}, {unique: true});