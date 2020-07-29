import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../Task/Task';

const TaskOverview = () => {
  const [selectedTask, setSelectedTask] = useState(1);
  const [taskList, setTaskList] = useState();

  const renderTaskSelector = () => {
    return (
      <div>
        <label>Select task to view: </label>
        <select onChange={(event) => setSelectedTask(event.target.value)}>
          <option value={1}>Weapons Qualification</option>
          <option value={2}>Combat Skills Training</option>
          <option value={3}>HMMV Driver Course</option>
          <option value={4}>Joint Communications Concepts</option>
          <option value={5}>Regional Familiarization</option>
          <option value={6}>Deployment Readiness Check</option>
        </select>
      </div>
    );
  };

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
      {console.log(taskList)}
      <div>
        {renderTaskSelector()}
        <br />
        <div>{taskList ? <Task tasks={taskList} /> : null}</div>
      </div>
    </Fragment>
  );
};

export default TaskOverview;
