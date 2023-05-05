const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class Post {

  // This constructor is used ONLY by the model
  // to provide the controller with instances that
  // have access to the instance methods isValidPassword
  // and update.
  constructor({ id, userId, content, createdAt }) {
    this.id = id;
    // this.communityId = communityId;
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    
  }

  async getUserPosts(userId) {
    try {
      const query = 'SELECT * FROM posts WHERE user_id = ?';
      const { rows } = await knex.raw(query, [userId]);
      rows.forEach((post) => {
        post
        if(!(user.posts.some((userPost) => userPost.id === post.id))) {
          user.posts.push(post);
        }
      })
      return user.posts;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getCommunityPosts(community) {
    try {
      const query = 'SELECT * FROM posts WHERE community_id = ?';
      const { rows } = await knex.raw(query, [community.id]);
      rows.forEach((post) => {
        post
        if(!(community.posts.some((communityPost) => communityPost.id === post.id))) {
          community.posts.push(post);
        }
      })
      return community.posts;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async list () {
    try {
      const query = 'SELECT * FROM posts';
      const { rows } = await knex.raw(query);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // static async find(id) {
  //   try {
  //     const query = 'SELECT * FROM users WHERE id = ?';
  //     const { rows: [user] } = await knex.raw(query, [id]);
  //     return user ? new User(user) : null;
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }

  // static async findByUsername(username) {
  //   try {
  //     const query = 'SELECT * FROM users WHERE username = ?';
  //     const { rows: [user] } = await knex.raw(query, [username]);
  //     return user ? new User(user) : null;
  //   } catch (err) {
  //     console.error(err);
  //     return null;
  //   }
  // }
  
  static async create(content, userId) {
    try {
      const query = `INSERT INTO posts (user_id, content) VALUES (?, ?) RETURNING *`;
      const { rows: [post] } = await knex.raw(query, [userId, content]);
      return new Post(post);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async delete(postId) {
    try {
      const query = 'DELETE FROM posts WHERE id = ? RETURNING *';
      const { rows: [post] } = await knex.raw(query, [postId]);
      return post;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAllUserPosts(user) {
    try {
      return knex.raw('DELETE * FROM posts WHERE user_id = ?;' [user.id]);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAllCommunityPosts(community) {
    try {
      return knex.raw('DELETE * FROM posts WHERE community_id = ?;' [user.id]);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  update = async (post, content) => { // dynamic queries are easier if you add more properties
    try {
      const response = await knex.raw(`UPDATE posts SET content = ? WHERE id = ? RETURNING *`, [content, post.id]);
      console.log(response)
      return response.rows[0];
    } catch {
      return null;
    }
  };

}

module.exports = Post;
