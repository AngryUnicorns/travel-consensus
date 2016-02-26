var React = require('react');
var ReactDOM = require('react-dom');

var TaskItem = React.createClass({
  clickHandler: function() {
    console.log('setting globalStateTaskId');
    window.globalStateTaskId = this.props.task.id;
  },

  render: function() {
    var circleClass = this.props.task.user_needs_to_vote ? "voted-icon fa fa-circle-thin" : "voted-icon fa fa-circle";
    if(this.props.task.consensus_choice){
      return (
        <div className="task-item" onClick={this.clickHandler}>
          <p>{this.props.task.name + " : " + this.props.task.consensus_choice}</p>
        </div>
        )
    } else {
      return (
        <div className="task-item" onClick={this.clickHandler}>
          <p>
          {this.props.task.name}
            <i className={circleClass}></i>
          </p>
        </div>
      )
    }
  }
})

module.exports = TaskItem;
