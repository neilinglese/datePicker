Accounts.onCreateUser(function(options, user) {

	console.log(options.profile.firstName);
	if (options.profile)
		user.profile = options.profile;

	user.friends = [];
	console.log(user);
	return user;
});