const pool = require('./database')

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS sgroup`;
const useDatabaseQuery = `USE sgroup`;
const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS USERS (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        GENDER TINYINT,
        NAME VARCHAR(255),
        USERNAME VARCHAR(30),
        AGE INT,
        PASSWORD VARCHAR(255),
        EMAIL NVARCHAR(255),
        SALT VARCHAR(255),
        FORGET_PASSWORD_TOKEN VARCHAR(255),
        FORGET_PASSWORD_TOKEN_EXPIRATION DATETIME,
        CHECK (AGE > 0)
    )`;
    const createPollsTableQuery = `
    CREATE TABLE IF NOT EXISTS POLLS (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        NAME NVARCHAR(256),
        DESCRIPTION NVARCHAR(256),
        QUESTION NVARCHAR(256)
    )`;
const createOptionsTableQuery = `
    CREATE TABLE IF NOT EXISTS OPTIONS (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        TITLE NVARCHAR(256),
        POLLID NVARCHAR(256),
        CONSTRAINT fk_poll_option FOREIGN KEY (POLLID) REFERENCES POLLS(ID) ON UPDATE CASCADE ON DELETE CASCADE
    )`;
const createUserOptionsTableQuery = `
    CREATE TABLE IF NOT EXISTS USER_OPTIONS (
        USERID INT,
        OPTIONID INT,
        PRIMARY KEY(USERID, OPTIONID),
        CONSTRAINT fk_user_option FOREIGN KEY (USERID) REFERENCES USERS(ID) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_option_option FOREIGN KEY (OPTIONID) REFERENCES OPTIONS(ID) ON UPDATE CASCADE ON DELETE CASCADE
    )`; 
(async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(createDatabaseQuery);
        await connection.query(useDatabaseQuery);
        await connection.query(createUsersTableQuery);
        await connection.query(createPollsTableQuery);
        await connection.query(createOptionsTableQuery);
        await connection.query(createUserOptionsTableQuery);
        console.log('Init database successfully!!');
    } catch (error) {
        console.error('Init database failed:', error);
    } finally {
        connection.release();
    }
})();

// For authorization feature

// CREATE TABLE role(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     role_name VARCHAR(50) NOT NULL UNIQUE,
//     description VARCHAR(255)
// );

// CREATE TABLE permission(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     permission_name VARCHAR(50) NOT NULL UNIQUE,
//     description VARCHAR(255)
// );


// CREATE TABLE user_role(
//     user_id INT,
//     role_id INT,
//     PRIMARY KEY (user_id, role_id),
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//     FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
// );

// CREATE TABLE role_permission(
//     role_id INT,
//     permission_id INT,
//     PRIMARY KEY (role_id, permission_id),
//     FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
//     FOREIGN KEY (permission_id) REFERENCES permission(id) ON DELETE CASCADE
// );



// INSERT INTO role(code) VALUES('admin'), ('staff');
// INSERT INTO user_role(roleId, userId) VALUES (1, 1);
// INSERT INTO permission_group(description) VALUES ('UserManagement');
// INSERT INTO permission_group(description) VALUES ('RoleManagement');
// INSERT INTO permission(code, description, groupId) VALUES ('CanReadUser', 'User List Information Read', 1);
// INSERT INTO permission(code, description, groupId) VALUES ('CanCreateUser', 'User Create', 1);
// INSERT INTO permission(code, description, groupId) VALUES ('CanCreateRole', 'Role Create', 2);
// INSERT INTO role_permission(roleId, permissionId) VALUES(1, 1);
// INSERT INTO role_permission(roleId, permissionId) VALUES(1, 2);
//