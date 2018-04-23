const { joinSchema, trimObject } = require('./validation');
const _ = require('lodash');
const mustache = require('mustache');

const Users = class Users {

  constructor() {
    this.users = [];
    this.rooms = [];
  }

  addUser(id, name, room, color) {
    let user = { id, name, room: room.toLowerCase(), color };
    trimObject(user);
    let errs = joinSchema.validate(user);

    if (this.users.map(user => user.name.toLowerCase()).indexOf(name.toLowerCase()) !== -1) {
      return 'Nickname already in use';
    } else if (errs.length !== 0) {
      return errs.join("\n");
    }

    this.users.push(user);
    this.addRoom(user.room);
    return user;
  }

  removeUser(id) {
    let index = this.users.map(user => user.id).indexOf(id);
    let removedUser;
    if (index !== -1) {
      removedUser = this.users.splice(index, 1)[0];
      this.removeRoom(removedUser.room);
    }
    return removedUser;
  }

  getUser(id) {
    let user = this.users.find(user => user.id === id);
    return user;
  }

  getUserList(room) {
    let users = this.users.filter(user => user.room === room);
    return users;
  }

  usersTemplate(room) {
    let users = this.getUserList(room);
    return mustache.to_html(usersListTemplate, { users });
  }

  getRooms() {
    let rooms = this.users.map(user => user.room);
    return _.uniq(rooms);
  }

  addRoom(room) {
    if (this.rooms.indexOf(room) === -1) {
      this.rooms.push(room);
    }
  }

  removeRoom(room) {
    let users = this.users.filter(user => user.room === room);
    let index = this.rooms.indexOf(room);
    if (users.length === 0 && index !== -1) {
      this.rooms.splice(index, 1);
    }
  }

  roomsTemplate() {
    let rooms = this.getRooms();
    return mustache.to_html(roomsOptionsTemplate, { rooms });
  }

};

const usersListTemplate = `
  <ul class="user-list">
    {{#users}}
      <li class="user" style="border-color: {{color}}">{{name}}</li>
    {{/users}}
  </ul>
`;

const roomsOptionsTemplate = `
  <option value="" default>Pick a room</option>
  {{#rooms}}
  <option value={{.}}>{{.}}</option>
  {{/rooms}}
`;

exports.users = new Users();