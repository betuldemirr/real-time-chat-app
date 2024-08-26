import React from "react";
import { UserListProps } from "../models/UserListProps";
import styled from "styled-components";

const UserList: React.FC<UserListProps> = ({
  userList,
  currentUser,
  socket,
}) => {
  if (userList.length === 0) {
    return (
      <UserListContainer>
        <p>No users online</p>
      </UserListContainer>
    );
  }

  const currentUserList = userList.filter(
    (user) => user.username === currentUser
  );
  const otherUsersList = userList.filter(
    (user) => user.username !== currentUser
  );

  return (
    <UserListContainer>
      <h2>Online Users</h2>
      <UserContainer>
        {currentUserList.map((user) => (
          <UserItem key={user.id}>
            <UserStatus />
            {user.username} (Me)
          </UserItem>
        ))}
        {otherUsersList.map((user) => (
          <UserItem key={user.id}>
            <UserStatus />
            {user.username}
          </UserItem>
        ))}
      </UserContainer>
    </UserListContainer>
  );
};

export default UserList;

const UserListContainer = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #e0f7e9;
  color: #000;
  padding: 20px;
  border-right: 2px solid #e0f7e9;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 200px;
  }
  @media (max-width: 480px) {
    width: 100px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserItem = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const UserStatus = styled.div`
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  margin-right: 10px;
`;
