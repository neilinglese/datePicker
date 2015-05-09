Dates = new Mongo.Collection('dates');

Dates.allow({
<<<<<<< HEAD
	insert: function(userId, doc){
		return !! userId;
	},
	remove: function(userId, doc){
		return !! userId;
	},
	update: function(userId, doc, fieldnames){
		return !! userId;
	}
});
=======
	insert: function(dateId, doc){
		return !! dateId;
	},
	remove: function(dateId, doc){
		return !! dateId;
	},
	update: function(dateId, doc, fieldnames){
		return !! dateId;
	}
});
>>>>>>> origin/master
