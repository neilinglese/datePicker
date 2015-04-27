Dates = new Mongo.Collection('dates');

Dates.allow({
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
