import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../Task/Task';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const TaskOverview = () => {
  const [selectedTask, setSelectedTask] = useState(1);
  const [taskList, setTaskList] = useState();
  const [tasks, setTasks] = useState();

  const renderTaskSelector = () => {
    return (
      <div>
        <InputLabel id="task-select-label">Select a task to view</InputLabel>
        <Select
          labelId="task-select-label"
          id="task-selector"
          value={selectedTask}
          onChange={(event) => setSelectedTask(event.target.value)}
        >
          {tasks.map((task) => (
            <MenuItem value={task.id}>{task.taskName}</MenuItem>
          ))}
        </Select>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/tasks`);
      setTasks(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/task-complete/task/${selectedTask}`
      );
      setTaskList(response.data);
    };
    fetchData();
  }, [selectedTask]);

  return (
    <Fragment>
      <div>
        {tasks ? renderTaskSelector() : null}
        <br />
        <div>{taskList ? <Task tasks={taskList} /> : null}</div>
      </div>
    </Fragment>
  );
};

export default TaskOverview;
