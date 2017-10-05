const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Nicole',
        room: 'The Nics'
      },
      {
        id: '2',
        name: 'Olive',
        room: 'Gooneyville'
      },
      {
        id: '3',
        name: 'Nicholas',
        room: 'The Nics'
      }
    ];
  });

  it('should add new user', () => {
    const theUsers = new Users();
    const user = { id: '1', name: 'Josh', room: 'Rush'};
    theUsers.addUser(user.id, user.name, user.room);
    expect(theUsers.users).toEqual([user]);
  });

  it('should return names for The Nics', () => {
    const userList = users.getUserList('The Nics');
    expect(userList).toEqual(['Nicole', 'Nicholas']);
  });

  it('should return names for Gooneyville', () => {
    const userList = users.getUserList('Gooneyville');
    expect(userList).toEqual(['Olive']);
  });

  it('should remove a user', () => {
    const removedUser = users.removeUser('2');
    expect(removedUser.name).toEqual('Olive');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const removedUser = users.removeUser('22');
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const foundUser = users.getUser('1');
    expect(foundUser.name).toBe('Nicole');
  });

  it('should not find user', () => {
    const foundUser = users.getUser('23');
    expect(foundUser).toNotExist();
  });
});

