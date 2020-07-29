import React, { useState, useEffect } from 'react';
import MemberTable from './MemberTable';
import axios from 'axios';
import MemberDetail from './MemberDetail';
import NavBar from './NavBar';

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
    <div>
      <NavBar />
      <MemberTable
        members={members}
        changeId={setMemberId}
        selected={memberId}
      />

      {selectedMember !== null ? (
        <MemberDetail member={selectedMember} />
      ) : null}
    </div>
  );
};

export default Dashboard;
