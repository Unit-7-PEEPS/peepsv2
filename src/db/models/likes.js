const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class Post {

    // This constructor is used ONLY by the model
    // to provide the controller with instances that
    // have access to the instance methods isValidPassword
    // and update.
    constructor({ id, user_id, created_tt }) {
      this.id = id;
      this.user_id = user_id;
      this.post_id = post_id;
      this.created_at = created_at;
      
    }

    async makeLike(user) {
        try {
          const query = 'INSERT INTO likes (user_id, post_id) VALUES (? , ?)';
          const { rows } = await knex.raw(query, [user_id]); 
      } catch(error) {console.error(error)}
    } 
}
