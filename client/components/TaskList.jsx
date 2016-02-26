var React = require('react');
var ReactDOM = require('react-dom');
var TaskItem = require('./TaskItem.jsx');

var TaskList = React.createClass({
  newTask: function(e){
    e.preventDefault();
    var newTask = {
      name: $('.newTask').val()
    }

    // clear newTask field
    $('.newTask').val('')

    var exists = this.props.tasks.reduce(function(exists, existingTask) {
      return exists || newTask.name.toLowerCase() === existingTask.name.toLowerCase();
    }, false);

    if(!exists){
      this.props.addNewTask(newTask);

      // intermediary setState; takes care of server-delay
      this.props.tasks.push(newTask);
      this.setState({tasks: this.props.tasks})
    }
  },

  render: function() {
    return (
      <div>
        <div className="task-list">
          {this.props.tasks.map(function(task) {
            return (<TaskItem task={task} />)
          }.bind(this))}
        </div>

            <hr />
        <div className="addTaskBox">
          <form onSubmit={this.newTask}>
            <label>Add a task</label>
            <input className="newTask" type="text" size="15" />
            <input type="submit" name="AddTask"/>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = TaskList;
