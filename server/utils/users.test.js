const { users } = require('./users');
const expect = require('expect');

describe('Users', () => {

  beforeEach(() => {

    users.users = [
      { id: '1', name: 'Daniel', room: 'red', color: 'red' },
      { id: '2', name: 'Sarah', room: 'blue', color: 'green' },
      { id: '3', name: 'Maria', room: 'red', color: 'pink' }
    ];
  });

  describe('addUser', () => {
    it('should reject user with existing name', () => {
      let err = users.addUser('4', 'Daniel', 'red');
      expect(err).toBeTruthy();
    });

    it('should save user', () => {
      let user = users.addUser('4', 'Daniela', 'red');
      console.log(user);
      expect(typeof user).toBe('object');
      expect(user).toMatchObject({
        id: '4',
        name: 'Daniela',
        room: 'red'
      });
      expect(users.users.length).toBe(4);
    });
  });

  describe('removeUser', () => {
    it('should not remove any user', () => {
      let user = users.removeUser('4');
      expect(user).toBeFalsy();
      expect(users.users.length).toBe(3);
    });
    it('should remove an existing user', () => {
      let user = users.removeUser('3');
      expect(user).toBeTruthy();
      expect(users.users.length).toBe(2);
    });
  });

  describe('getUser', () => {
    it('should not fetch any user', () => {
      let user = users.getUser('4');
      expect(user).toBeFalsy();
    });
    it('should fetch an existing user', () => {
      let user = users.getUser('3');
      expect(user).toBeTruthy();
    });
  });

  describe('getUserList', () => {
    it('should return empty list', () => {
      let userList = users.getUserList('green');
      expect(userList.length).toBe(0);
    });
    it('should return the rooms user list', () => {
      let userList = users.getUserList('red');
      console.log(users.usersTemplate('red'));
      expect(userList.length).toBe(2);
    });
  });

  describe('usersTemplate', () => {
    it('should return valid usersTemplate', () => {
      let usersTemplate = users.usersTemplate('red');
      expect(usersTemplate).toMatch(new RegExp(`<li class="user" style="border-color: red">${users.users[0].name}</li>`));
      expect(usersTemplate).toMatch(new RegExp(`<li class="user" style="border-color: pink">${users.users[2].name}</li>`));
    });
  });

  describe('getRooms', () => {
    it('should return a list of all the rooms', () => {
      let rooms = users.getRooms();
      expect(rooms).toEqual(['red', 'blue']);
    });
  });

  describe('addRoom', () => {
    it('should reject room with same name', () => {
      users.addUser('4', 'Mateo', 'red');
      expect(users.getRooms().length).toBe(2);
    });
    it('should add new room', () => {
      users.addUser('4', 'Mateo', 'green');
      expect(users.getRooms().length).toBe(3);
    });
  });

  describe('removeRoom', () => {
    it('should remove empty room', () => {
      users.removeUser('2');
      expect(users.getRooms().length).toBe(1);
    });
    it('should leave populated room', () => {
      users.removeUser('3');
      expect(users.getRooms().length).toBe(2);
    });
  });

});