const pgPool = require('../postgre/connection');

const sql = {
    INSERT_JOIN_REQUEST: 'INSERT INTO join_requests (sender_username, group_name, status, created_at) VALUES ($1, $2, $3, $4)',
    GET_JOIN_REQUESTS: 'SELECT * FROM join_requests',
    GET_PENDING_JOIN_REQUESTS: `SELECT join_requests.* FROM join_requests JOIN users_groups ON join_requests.group_name = users_groups.group_name WHERE join_requests.status = $1 AND join_requests.group_name = $2 AND (users_groups.admin = true OR users_groups.username = $3);`,
    ACCEPT_JOIN_REQUEST: 'UPDATE join_requests SET status = $1 WHERE request_id = $2',
    DENY_JOIN_REQUEST: 'UPDATE join_requests SET status = $1 WHERE request_id = $2',
    GET_JOIN_REQUEST_BY_SENDER_AND_GROUP: 'SELECT * FROM join_requests WHERE sender_username = $1 AND group_name = $2',
    DELETE_JOIN_REQUEST: 'DELETE FROM join_requests WHERE sender_username = $1 AND group_name = $2',
    GET_JOIN_REQUEST_BY_ID: 'SELECT * FROM join_requests WHERE request_id = $1::integer',
    CHECK_USER_GROUP_MEMBERSHIP: 'SELECT COUNT(*) FROM users_groups WHERE username = $1 AND group_name = $2',
};

// Creates a new join request with the status "pending"
async function addJoinRequest(senderUsername, groupName, status = 'pending') {
    const createdAt = new Date();
    await pgPool.query(sql.INSERT_JOIN_REQUEST, [senderUsername, groupName, status, createdAt]);
}

// Gets all the join requests
async function getJoinRequests() {
    const result = await pgPool.query(sql.GET_JOIN_REQUESTS);
    return result.rows;
}

// Gets a join request with its id
async function getJoinRequestById(requestId) {
    try {
        console.log('Request ID:', requestId);
        const result = await pgPool.query(sql.GET_JOIN_REQUEST_BY_ID, [requestId]);
        console.log('SQL Query:', sql.GET_JOIN_REQUEST_BY_ID, [requestId]);
        console.log('Query Result:', result.rows);

        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Error in getJoinRequestById:', error.stack);
        throw error;
    }
}

// Checks if the user is part of the dedicated group where join request is sent
async function isUserGroupMember(username, groupName) {
    try {
        const result = await pgPool.query(sql.CHECK_USER_GROUP_MEMBERSHIP, [username, groupName]);
        return result.rows[0].count > 0;
    } catch (error) {
        console.error('Error checking if user is a group member:', error);
        throw new Error('Failed to check user group membership.');
    }
}

// Gets pending join requests 
async function getPendingJoinRequests(groupName, username) {
    try {
        // Check if the group exists
        const groupExistsQuery = 'SELECT COUNT(*) FROM groups WHERE group_name = $1';
        const groupExistsResult = await pgPool.query(groupExistsQuery, [groupName]);
        const groupExists = groupExistsResult.rows[0].count > 0;

        if (!groupExists) {
            throw new Error(`Group '${groupName}' does not exist`);

        }
        // Retrieve pending join requests
        const result = await pgPool.query(sql.GET_PENDING_JOIN_REQUESTS, ['pending', groupName, username]);
        return result.rows;

    } catch (error) {
        console.error('Error checking if group exists or fetching join requests:', error);
        return []; // Or return an error response
    }
}

// Gets the join requests by senderusername and groupname
async function getJoinRequestBySenderAndGroup(senderUsername, groupName) {
    const result = await pgPool.query(sql.GET_JOIN_REQUEST_BY_SENDER_AND_GROUP, [senderUsername, groupName]);
    return result.rows;
}

// Deletes a join request
async function deleteJoinRequest(requestId) {
    try {
        // Retrieve the request_id for the join request
        const getRequestQuery = 'SELECT request_id FROM join_requests WHERE request_id = $1';
        const getRequestResult = await pgPool.query(getRequestQuery, [requestId]);

        if (getRequestResult.rows.length > 0) {
            const requestId = getRequestResult.rows[0].request_id;

            // Log the requestId for debugging
            console.log('Deleting join request with requestId:', requestId);

            // Delete the join request
            const deleteQuery = 'DELETE FROM join_requests WHERE request_id = $1';
            await pgPool.query(deleteQuery, [requestId]);

            // Return null or any other meaningful value
            return null;
        } else {
            console.log(`Join request not found for ID: ${requestId}`);
            return null;
        }
    } catch (error) {
        console.error('Error deleting join request:', error);
        throw new Error('Failed to delete join request.');
    }
}

// Adds the user to the dedicated group
async function addUserToGroup(username, groupName) {
    // Check if the user is already a member of the group
    const userExistsQuery = 'SELECT COUNT(*) FROM users_groups WHERE username = $1 AND group_name = $2';
    const userExistsParams = [username, groupName];

    const userExistsResult = await pgPool.query(userExistsQuery, userExistsParams);
    const userExists = userExistsResult.rows[0].count > 0;

    // If the user is not already a member, insert into the table
    if (!userExists) {
        const query = 'INSERT INTO users_groups (username, group_name, admin) VALUES ($1, $2, $3)';
        const params = [username, groupName, false]; // Set admin to false for every user

        try {
            await pgPool.query(query, params);
            console.log(`User '${username}' added to group '${groupName}' successfully.`);
        } catch (error) {
            console.error(`Error adding user '${username}' to group '${groupName}':`, error);
            throw new Error('Failed to add user to the group.');
        }
    } else {
        console.log(`User '${username}' is already a member of group '${groupName}'.`);
        // You can handle this case differently, depending on your requirements
        // For example, you might want to update the user's status or return a specific message
    }
}

// Accepts the join request
async function acceptJoinRequest(requestId) {
    // Assuming 'accepted' has an ID of 1 (replace with the actual ID in your database)
    console.log('SQL Query:', sql.ACCEPT_JOIN_REQUEST, ['accepted', requestId]);
    await pgPool.query(sql.ACCEPT_JOIN_REQUEST, ['accepted', requestId]);
}

//Denies the join request
async function denyJoinRequest(requestId) {
    await pgPool.query(sql.DENY_JOIN_REQUEST, ['denied', requestId]);
}

// Gets all join requests for a dedicated group
async function getJoinRequestsForGroup(groupName) {
    const result = await pgPool.query(
        'SELECT join_requests.* FROM join_requests WHERE join_requests.group_name = $1',
        [groupName]
    );
    return result.rows;
}

module.exports = {
    addJoinRequest,
    getJoinRequests,
    getJoinRequestBySenderAndGroup,
    deleteJoinRequest,
    getPendingJoinRequests,
    acceptJoinRequest,
    denyJoinRequest,
    getJoinRequestsForGroup,
    getJoinRequestById,
    addUserToGroup,
    isUserGroupMember,
};
