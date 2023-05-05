const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class User {
  #passwordHash = null;

  // This constructor is used ONLY by the model
  // to provide the controller with instances that
  // have access to the instance methods isValidPassword
  // and update.
  constructor({ id, username, password, firstName, lastName, email }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email =  email;
    this.posts = [];
  }

  static async list() {
    try {
      const query = 'SELECT * FROM users';
      const { rows } = await knex.raw(query);
      return rows.map((user) => new User(user));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async find(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = ?';
      const { rows: [user] } = await knex.raw(query, [id]);
      return user ? new User(user) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async findByUsername(username) {
    try {
      const query = 'SELECT * FROM users WHERE username = ?';
      const { rows: [user] } = await knex.raw(query, [username]);
      return user ? new User(user) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(username, password, firstName, lastName, email) {
    try {
      const passwordHash = await authUtils.hashPassword(password);

      const query = `INSERT INTO users (username, password, first_name, last_name, email)
        VALUES (?, ?, ?, ?, ?) RETURNING *`;
      const { rows: [user] } = await knex.raw(query, [username, passwordHash, firstName, lastName, email]);
      console.log(user);
      return new User(user);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    try {
      return knex.raw('TRUNCATE users;');
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  update = async (username) => { // dynamic queries are easier if you add more properties
    try {
      const [updatedUser] = await knex('users')
        .where({ id: this.id })
        .update({ username })
        .returning('*');
      return updatedUser ? new User(updatedUser) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );

}

module.exports = User;
