var OAuth = require('../lib/oauth.min.js').OAuth;
var OAuthUser = require('../lib/oauth.min.js').User;
var PostHelper = require('../requests/post.js');

OAuth.initialize('njnrc8cfKF1IOQAKEGLjQnjl-j0');

const User = module.exports;

var currentUser = null;

User.signIn = function() {
	return OAuth.popup('facebook')
	.fail(console.log)
	.then(OAuthUser.signin)
	.then(function(res){
		return PostHelper.createUser(res).then(function(user){
			localStorage.setItem('db_user', JSON.stringify(user));
		});
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
		return OAuthUser.getIdentity().logout()
		.then(function(){
      		localStorage.setItem('db_user', null);
    	})
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

User.getDbUser = function() {
	var dbString = localStorage.getItem('db_user');
	if(dbString) {
		return JSON.parse(dbString);
	} else {
		return {};
	}
}

User.getID = function() {
	return User.getDbUser().id;
}
