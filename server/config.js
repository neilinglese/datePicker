Accounts.onCreateUser(function(options, user) {
	user.friends = [];
	return user;
});