
const Task = module.exports;
var _ = require('underscore');

Task.process = function(task, userCount) {
	voteCount = _.reduce(task.suggestions, function(total, next){
		return total + next.votes.length;
	}, 0);
	var consensusReached = voteCount >= userCount / 2;
	if(consensusReached) {
		var topSuggestion = getTopSuggestion(task.suggestions);
		task.consensus_choice = topSuggestion.suggestion;
	}
	return task;
}

function getTopSuggestion(suggestions) {
	return _.sortBy(suggestions, function(suggestion){
		return suggestion.votes.length * -1;
	})[0];
}
