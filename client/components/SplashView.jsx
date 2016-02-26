var React = require('react');
var ReactDOM = require('react-dom');

var SplashView = React.createClass({

  // getDefaultProps: function(){
  //   return {
  //     img: "https://i.ytimg.com/vi/TvyWRevLG5I/maxresdefault.jpg"
  //   }
  // },

  render: function() {
    return (
      <img className="splash" src="https://i.ytimg.com/vi/TvyWRevLG5I/maxresdefault.jpg"/>
      )
  }
});

module.exports = SplashView;