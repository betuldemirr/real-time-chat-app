import React from "react";
import styled from "styled-components";
import { UserListProps } from "../models/UserListProps";

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

  console.log("UserList before filter and map:", userList);

  const currentUserList = userList.filter(
    (user) => user.username === currentUser
  );
  console.log("Filtered current user:", currentUserList);

  const otherUsersList = userList.filter(
    (user) => user.username !== currentUser
  );
  console.log("Filtered other users:", otherUsersList);

  const currentUserItems = currentUserList.map((user) => (
    <UserItem key={user.id}>
      <UserStatus />
      {user.username} (Me)
    </UserItem>
  ));
  console.log("Current user items:", currentUserItems);

  const otherUserItems = otherUsersList.map((user) => (
    <UserItem key={user.id}>
      <UserStatus />
      {user.username}
    </UserItem>
  ));
  console.log("Other user items:", otherUserItems);

  return (
    <UserListContainer>
      <h2>Online Users</h2>
      <UserContainer>
        {userList
          .filter((user) => user.username === currentUser)
          .map((user) => (
            <UserItem key={user.id}>
              <UserStatus />
              {user.username} (Me)
            </UserItem>
          ))}
        {userList
          .filter((user) => user.username !== currentUser)
          .map((user) => (
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
  height: 100%;
  background-color: #e0f7e9;
  color: #000;
  padding: 20px;
  border: 2px solid #e0f7e9;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  h2 {
    margin-bottom: 20px;
    color: #4caf50;
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
  &:last-child {
    border-bottom: none;
  }
`;

const UserStatus = styled.div`
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  margin-right: 10px;
`;
