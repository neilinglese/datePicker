Meteor.publish('events', function(){
	return Events.find({userId: this.userId});
});


Meteor.publish('findById', function(){
	return Events.find({_id: this._id});
});

Meteor.publish('usersDates', function(){
	return Events.find({$or: [{userId: this.userId} , {'groupMembers.memberId': this.userId}]});
});

Meteor.publish('getDates', function(){
	//todo: get dates from event for userId and each groupMember's memberDates
	return Events.find();
});