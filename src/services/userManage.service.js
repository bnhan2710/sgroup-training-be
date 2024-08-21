const knex = require('../configs/knexdb');
const bcrypt = require('bcrypt');
const ErrorResponse = require('../utils/error.response');
class userManageService {
  createUser = async (user) => {
    const CreatedAt = new Date();
    const { gender, name, username, age, password, email } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
      await knex('users').insert({
        gender,
        name,
        username,
        age,
        password: hashedPassword,
        email,
        CreatedAt,
      });

      return { message: 'User created successfully' };
  };

  updateUser = async (id, user) => {
    const { gender, name, username, age, email } = user;
      const userExists = await knex('users').where('id', id).select('id').first();
      if (!userExists) {
        throw new ErrorResponse(404, 'User not found');
      }

      await knex('users').where('id', id).update({ gender, name, username, age, email });

      return { message: 'User updated successfully' };
  };

  deleteUser = async (id) => {
      const userExists = await knex('users').where('id', id).select('id').first();
      if (!userExists) {
        throw new ErrorResponse(404,'User Not Found')
      }

      await knex('users').where('id', id).del();
      return { message: 'User deleted successfully' };
  };

  getUserById = async (id) => {
      const user = await knex('users').where('id', id).select('*').first();
      if (!user) {
        throw new ErrorResponse(404, 'User not found');
      }
      return user
  };

  getUserWithPagination = async (page, pagesize) => {

    const PAGE_NUMBER = parseInt(page, 10);
    const PAGE_SIZE = parseInt(pagesize, 10);
    
    if (isNaN(PAGE_NUMBER) || PAGE_NUMBER <= 0) {
      throw new ErrorResponse(400, 'Invalid page number');
    }
    
    if (isNaN(PAGE_SIZE) || PAGE_SIZE <= 0) {
      throw new ErrorResponse(400, 'Invalid page size');
    }
    
    const users = await knex('users')
      .select('*')
      .limit(PAGE_SIZE)
      .offset((PAGE_NUMBER - 1) * PAGE_SIZE);
    
    return users;
    }
}

module.exports = new userManageService();
