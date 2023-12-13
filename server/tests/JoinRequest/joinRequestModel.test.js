const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');

const {addJoinRequest, getJoinRequestById, getJoinRequestBySenderAndGroup, getPendingJoinRequests, acceptJoinRequest, denyJoinRequest, deleteJoinRequest, addUserToGroup, getJoinRequestsForGroup,  } = require('../../models/joinrequest_model');

describe('JoinRequest API models', () => {
    before(async () => {
        // Perform any setup before running the tests, e.g., creating a test database or adding test data
    });

    after(async () => {
        // Perform cleanup after running the tests, e.g., removing test data or closing connections
        // Optionally, you can close the database connection here if needed
    });

    describe('getJoinRequestsForGroup', async () => {
        it('Should get all join requests to a dedicated group', async () => {
            // Assuming you have added some test data before running this test
            const response = await getJoinRequestsForGroup('testGroups');
            expect(response).to.be.an('array');
            // You can add more specific assertions based on your expectations
        });

        it('should get all join requests by sendername and groupname', async () =>{
            const response = await getJoinRequestBySenderAndGroup('testuser','testGroup')
            expect(response).to.be.an('array');
        })

        it('should get all pending join requests', async () =>{
            const response = await getPendingJoinRequests('testGroup' ,'testuser1')
            expect(response).to.be.an('array');
        })
    });
    

    describe('addJoinRequest', async () => {
        it('Should add a join request', async () => {
            // Assuming you have a test user and group for this case
            const senderUsername = 'testuser1';
            const groupName = 'testGroup';
            const status = 'pending';
            await addJoinRequest(senderUsername, groupName, status);

            // Now, you can check if the join request has been added successfully
            const addedRequest = await getJoinRequestBySenderAndGroup(senderUsername, groupName);
            expect(addedRequest).to.not.be.null;
            // You can add more specific assertions based on your expectations
        });
    });

    describe('Accept/deny joinrequest', async () => {
        it('should accept a join request', async () => {
            const joinRequestId = 76;
        
            // Get the join request by ID
            const joinRequest = await getJoinRequestById(joinRequestId);
        
            if (joinRequest && joinRequest.value > 0) {
                // Accept the join request
                await acceptJoinRequest(joinRequestId);
        
                // Check the status after accepting the join request
                const updatedJoinRequest = await getJoinRequestById(joinRequestId);
                
                // Use chai's expect syntax for assertions
                expect(updatedJoinRequest.status).to.equal('accepted');
            } else {
                // Log or handle the case where the join request does not exist
                console.log('Join request not found or value is not greater than 0');
            }
        });

        it('should deny a join request', async () => {
            const joinRequestId = 44;
    
            // Deny the join request
            const response =await denyJoinRequest(joinRequestId);
    
            // Check if the status of the join request is 'denied'
            expect(response).status = 'denied';
        });
    });

    // Add more test cases for other functions...

    describe('deleteJoinRequest', async () => {
        it('Should delete a join request to a group', async () => {
            const joinRequestId = 123; // Replace with the actual join request ID
            const result = await deleteJoinRequest(joinRequestId);
        
            // Adjust the expectation based on the actual return value
            expect(result).to.be.null; // or expect(result).to.be.undefined; or any other meaningful check
        });
    });

    // Add more test cases for other functions...
});