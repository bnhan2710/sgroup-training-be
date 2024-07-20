const knex = require('../configs/knexdb');
const bcrypt = require('bcrypt');

class userManageService {
  createUser = async (user) => {
    const CreatedAt = new Date();
    const { gender, name, username, age, password, email } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await knex('users').insert({
        gender,
        name,
        username,
        age,
        password: hashedPassword,
        email,
        CreatedAt,
      });

      return { code: 200, message: 'User created successfully' };
    } catch (err) {
      console.error(err);
      return { code: 500, message: 'Create failed' };
    }
  };

  updateUser = async (id, user) => {
    const { gender, name, username, age, email } = user;

    try {
      const userExists = await knex('users').where('id', id).select('id').first();
      if (!userExists) {
        return { code: 404, message: 'User not found' };
      }

      await knex('users').where('id', id).update({ gender, name, username, age, email });

      return { code: 200, message: 'User updated successfully' };
    } catch (err) {
      console.error(err);
      return { code: 500, message: 'Update failed' };
    }
  };

  deleteUser = async (id) => {
    try {
      const userExists = await knex('users').where('id', id).select('id').first();
      if (!userExists) {
        return { code: 404, message: 'User not found' };
      }

      await knex('users').where('id', id).del();

      return { code: 200, message: 'User deleted successfully' };
    } catch (err) {
      console.error(err);
      return { code: 500, message: 'Delete failed' };
    }
  };

  getUserById = async (id) => {
    try {
      const user = await knex('users').where('id', id).select('*').first();
      if (!user) {
        return { code: 404, message: 'User not found' };
      }

      return { code: 200, message: user };
    } catch (err) {
      console.error(err);
      return { code: 500, message: 'Get user failed ' };
    }
  };

  getUserWithPagination = async (page, pagesize) => {
    try {
      const PAGE_NUMBER = parseInt(page);
      const _SKIP = parseInt(pagesize);
      const users = await knex('users')
        .select('*')
          .limit(PAGE_NUMBER)
          .offset((PAGE_NUMBER * (_SKIP - 1)));
      return {
          code: 200,
          message: users
      };
    } catch (err) {
      console.error(err);
      return {
        code: 500,
        message: 'Get failed',
      };
    }
  };
}

module.exports = new userManageService();
