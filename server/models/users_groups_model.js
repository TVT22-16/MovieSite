const pgPool = require('../postgre/connection');

const sql = {
    INSERT_USER_GROUP: 'INSERT INTO users_groups (username, group_name, admin) VALUES ($1, $2, $3)',
    GET_USER_GROUP: 'SELECT username, group_name, admin FROM users_groups',
    UPDATE_USERS_GROUP: 'UPDATE users_groups SET username = $1, group_name = $2, admin = $3 WHERE username = $1',
    DELETE_USERS_GROUPS: 'DELETE FROM users_groups WHERE username = $1',
    GET_GROUPMEMBERS: 'SELECT username, admin FROM users_groups WHERE group_name = $1',
    GET_REVIEWSFORGROUP: 'SELECT ug.username, ug.group_name, r.review, r.moviedb_movieid FROM users_groups ug JOIN reviews r ON ug.username = r.username WHERE ug.group_name = $1',
};

async function addUserGroup(username,group_name,admin){
    await pgPool.query(sql.INSERT_USER_GROUP, [username,group_name,admin]);
    console.log(sql.INSERT_USER_GROUP, [username,group_name,admin]);
}
async function getUserGroup(){
    const result = await pgPool.query(sql.GET_USER_GROUP);
    const rows = result.rows;
    return rows;
}
async function getGroupMembers(group_name) {
    const result = await pgPool.query(sql.GET_GROUPMEMBERS, [group_name]);
    const rows = result.rows;
    return rows;
}
async function updateUserGroup(username,group_name,admin){
    await pgPool.query(sql.UPDATE_USERS_GROUP, [username,group_name,admin]);
    console.log(sql.UPDATE_USERS_GROUP, [username,group_name,admin]);
}
async function deleteUserGroup(username){
    await pgPool.query(sql.DELETE_USERS_GROUPS, [username]);
    console.log(sql.DELETE_USERS_GROUPS, [username]);
}
async function getReviewsForGroup(group_name){
    const result = await pgPool.query(sql.GET_REVIEWSFORGROUP, [group_name]);
    const rows = result.rows;
    return rows;
}

module.exports = {addUserGroup,getUserGroup,getGroupMembers,updateUserGroup,deleteUserGroup,getReviewsForGroup}