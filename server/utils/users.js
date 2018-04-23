const { joinSchema, trimObject } = require('./validation');
const _ = require('lodash');
const mustache = require('mustache');

const Users = class Users {

  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    let user = { id, name, room };
    trimObject(user);
    console.log(user);
    let errs = joinSchema.validate(user);
    console.log(user);

    if (this.users.map(user => user.name).indexOf(name) !== -1) {
      return 'Nickname already in use';
    } else if (errs.length !== 0) {
      return errs.join("\n");
    }

    this.users.push(user);
    return user;
  }

  removeUser(id) {
    let index = this.users.map(user => user.id).indexOf(id);
    let removedUser;
    if (index !== -1) {
      removedUser = this.users.splice(index, 1)[0];
    }
    return removedUser;
  }

  getUser(id) {
    let user = this.users.find(user => user.id === id);
    return user;
  }

  getUserList(room) {
    let users = this.users.filter(user => user.room === room);
    return users.map(user => user.name);
  }

  usersTemplate(room) {
    let users = this.getUserList(room);
    return mustache.to_html(listTemplate, { users });
  }

};

const listTemplate = `
  <ul class="user-list">
    {{#users}}
      <li class="user">{{.}}</li>
    {{/users}}
  </ul>
`;

exports.users = new Users();