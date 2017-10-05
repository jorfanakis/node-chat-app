// ES6 Class for User
class Users {
  constructor () {
    this.users = [];
  }

  addUser(id, name, room) {
    this.users.push({id, name, room});
    return this.users[this.users.length -1];
  }

  removeUser(id) {
    const userToRemove = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return userToRemove;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {
    //var users = this.users.filter((user) => { return user.room === room; })
    const filteredUsers = this.users.filter((user) => user.room === room);
    //var namesArray = users.map((user) => { return user.name;});
    const namesArray = filteredUsers.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};
