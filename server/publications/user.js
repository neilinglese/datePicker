Meteor.publish('userFriends', function() {
	if (!this.userId) return null;

	return Meteor.users.find(this.userId, {
		fields: {friends: 1}
	});
});