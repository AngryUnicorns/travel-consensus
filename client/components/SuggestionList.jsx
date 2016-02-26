var React = require('react');
var ReactDOM = require('react-dom');
var SuggestionItem = require('./SuggestionItem.jsx');

var SuggestionList = React.createClass({
  render: function() {
    // can not read property `map` of undefined, yet it logs inside of this?
    // I think it has something to do with virtual dom processing vs. actual
    // rendering. It works!
    var suggestions = this.props.suggestions || [];
    var suggestionList = suggestions.map(function(suggestion) {
      return <SuggestionItem
               suggestion={suggestion}
             />
    }.bind(this));

    return (
      <div className="suggestion-display">
        <h4>Suggestions:</h4>
        {suggestionList}
      </div>
    )
  }
});

module.exports = SuggestionList;
