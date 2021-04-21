const users = [];

const addUser = ({ id, name, room }) => {
    // remove all white space and lowercase user inputs
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

    // if there is an existing user in an existing room, return invalid response
  const existingUser = users.find((user) => user.room === room && user.name === name);
  if(existingUser) return { error: 'Username is taken.' };
  // if room or name is falsy (!true), return invalid response
  if(!name || !room) return { error: 'Username and room are required.' };
    // if if statements not hit, create user object. Then push to users array to keep track
  const user = { id, name, room };
  users.push(user);

  return { user };
}

const removeUser = (id) => {
    //get index of use
  const index = users.findIndex((user) => user.id === id);
    // Returns the user we removed, while removing user from array
  if(index !== -1) return users.splice(index, 1)[0];
}

// Get user from array by ID
const getUser = (name) => {
  let trimmedName = name.trim().toLowerCase();
  return users.find((user) => user.name === trimmedName)
};

// Get all the users in a specific room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };