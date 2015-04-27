DatesPicked = new Mongo.Collection('datesPicked');

DatesPicked.allow({
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
