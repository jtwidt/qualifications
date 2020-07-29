import React, { useState, useEffect } from 'react';
import MemberTable from '../MemberTable/MemberTable';
import axios from 'axios';
import MemberDetail from '../MemberDetail/MemberDetail';
import NavBar from '../NavBar/NavBar';
import TaskOverview from '../TaskOverview/TaskOverview';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/users`);
      setMembers(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/task-complete/user/${memberId}`
      );
      setSelectedMember(response.data);
    };
    fetchData();
  }, [memberId]);

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/tasks">
            <TaskOverview />
          </Route>
          <Route>
            <MemberTable
              members={members}
              changeId={setMemberId}
              selected={memberId}
            />

            {selectedMember !== null ? (
              <MemberDetail member={selectedMember} />
            ) : null}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Dashboard;
