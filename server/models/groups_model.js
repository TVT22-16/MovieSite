

const pgPool = require('../postgre/connection');

const sql = {
    INSERT_GROUP: 'INSERT INTO groups VALUES ($1, $2)',
    GET_GROUPS: 'SELECT group_name,group_description FROM groups',
    GET_GROUPBYNAME: 'SELECT * FROM groups WHERE group_name = $1',
    UPDATE_GROUP: 'UPDATE groups SET group_name = $1, group_description = $2 WHERE group_name = $1',
    DELETE_GROUP: 'DELETE FROM groups WHERE group_name = $1',
    GET_GROUPS_BY_USER: `
    SELECT groups.*, users_groups.admin AS is_group_admin
FROM groups
INNER JOIN users_groups ON groups.group_name = users_groups.group_name
WHERE users_groups.username = $1;
  `,
};


async function addGroup(group_name,group_description){
    await pgPool.query(sql.INSERT_GROUP, [group_name,group_description]);
    console.log(sql.INSERT_GROUP, [group_name,group_description]);
}

async function getGroups(){
    const result = await pgPool.query(sql.GET_GROUPS);
    const rows = result.rows;
    return rows;
}

async function getGroupbyname(group_name){
    const result = await pgPool.query(sql.GET_GROUPBYNAME,[group_name]);
    const rows = result.rows;
    return rows;
}

async function updateGroup(group_name,group_description){
    await pgPool.query(sql.UPDATE_GROUP, [group_name,group_description]);
    console.log(sql.UPDATE_GROUP, [group_name,group_description]);
}

async function deleteGroup(group_name){
    await pgPool.query(sql.DELETE_GROUP, [group_name]);
    console.log(sql.DELETE_GROUP, [group_name]);
}

async function getGroupsByUser(username) {
    const query = {
        text: `
        SELECT groups.*, users_groups.admin AS is_group_admin
        FROM groups
        INNER JOIN users_groups ON groups.group_name = users_groups.group_name
        WHERE users_groups.username = $1;
        `,
        values: [username],
      };
    
      const result = await pgPool.query(query);
      console.log(result);
      const rows = result.rows;
      return rows;
    }

module.exports = {addGroup, getGroups, getGroupbyname, updateGroup, deleteGroup, getGroupsByUser};