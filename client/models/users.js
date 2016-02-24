var OAuth = require('../lib/oauth.min.js').OAuth;
var OAuthUser = require('../lib/oauth.min.js').User;

OAuth.initialize('njnrc8cfKF1IOQAKEGLjQnjl-j0');

const User = module.exports;

User.signIn = function() {
	return OAuth.popup('github').then(function(res){
		return OAuthUser.signin(res);
	}).fail(function(error){
		console.log(error);
	})
}

User.isLoggedIn = function() {
	return OAuthUser.isLogged();
};

User.signOut = function() {
	var user = OAuthUser.getIdentity();
	if(!user) {
		return Promise.resolve(null);
	} else {
		return OAuthUser.getIdentity().logout();
	}
}

User.isUserMatch = function(id) {
	var userID = User.getID();
	return !!userID && !!id && id === userID;
}

User.confirmLoggedIn = function() {
	if(!User.isLoggedIn()) {
		m.route('/sign-in');
	}
}

User.getInfo = function() {
	return OAuthUser.getIdentity();
}

User.getID = function() {
	return User.getInfo().token;
}