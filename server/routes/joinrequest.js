const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const { addJoinRequest, addUserToGroup,getPendingJoinRequestForGroup, getJoinRequests,getPendingJoinRequests,getJoinRequestById,getJoinRequestsForGroup, getJoinRequestBySenderAndGroup, updateJoinRequestStatus, deleteJoinRequest, acceptJoinRequest, denyJoinRequest, isUserGroupMember} = require('../models/joinrequest_model');

/**
 * Join Requests Routes
 */

// Get all join requests
router.get('/', async (req, res) => {
    try {
        const joinRequests = await getJoinRequests();
        res.json(joinRequests);
    } catch (error) {
        console.error("Error fetching join requests:", error);
        res.status(500).json({ error: "Error fetching join requests" });
    }
});

// Add a new join request
router.post('/add', async (req, res) => {
  const { senderUsername, groupName, status } = req.body;

  try {
      // Check if the user is already a member of the group
      const isMember = await isUserGroupMember(senderUsername, groupName);
      if (isMember) {
          return res.status(400).json({ error: "User is already a member of the group" });
      }

      // If not a member, proceed to add the join request
      await addJoinRequest(senderUsername, groupName, status);
      res.end();
  } catch (error) {
      console.error("Error adding join request:", error);
      res.status(500).json({ error: "Error adding join request" });
  }
});

// Get join requests by sender and group
router.get('/:senderUsername/:groupName', async (req, res) => {
    const { senderUsername, groupName } = req.params;

    try {
        const joinRequests = await getJoinRequestBySenderAndGroup(senderUsername, groupName);
        res.json(joinRequests);
    } catch (error) {
        console.error("Error fetching join request:", error);
        res.status(500).json({ error: "Error fetching join request" });
    }
});

// Update join request status
router.put('/update-status/:senderUsername/:groupName', async (req, res) => {
    const { senderUsername, groupName } = req.params;
    const { status } = req.body;

    try {
        await updateJoinRequestStatus(status, senderUsername, groupName);
        res.end();
    } catch (error) {
        console.error("Error updating join request status:", error);
        res.status(500).json({ error: "Error updating join request status" });
    }
});

// Delete join request
router.delete('/delete/:senderUsername/:groupName', async (req, res) => {
    const { senderUsername, groupName } = req.params;

    try {
        await deleteJoinRequest(senderUsername, groupName);
        res.end();
    } catch (error) {
        console.error("Error deleting join request:", error);
        res.status(500).json({ error: "Error deleting join request" });
    }
});

// joinrequest.js
router.get('/pending-join-requests/:groupName/:username', async (req, res) => {
  try {
    const groupName = req.params.groupName;
    const username = req.params.username;

    // Check if the user has a pending join request for the group
    const pendingJoinRequests = await getPendingJoinRequests(groupName, username);

    // Determine whether the user has a pending join request
    const hasPendingJoinRequest = pendingJoinRequests.length > 0;

    // Respond with the result
    res.status(200).json({
      success: true,
      data: {
        hasPendingJoinRequest,
        pendingJoinRequests,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
});

  router.post('/accept/:requestId', async (req, res) => {
    const { requestId } = req.params;
  
    try {
      // Fetch the join request by requestId
      const joinRequest = await getJoinRequestById(requestId);
  
      if (!joinRequest) {
        console.log('Join request not found:', requestId);
        return res.status(404).json({ success: false, error: 'Join request not found' });
      }
  
      // Log values for debugging
      console.log('Join request:', joinRequest);
  
      // Perform the logic to add the user to the group
      await addUserToGroup(joinRequest.sender_username, joinRequest.group_name);
  
      // Update the join request status to 'accepted'
      await acceptJoinRequest(requestId);
  
      res.status(200).json({ success: true, message: 'Join request accepted and user added to the group' });
    } catch (error) {
      console.error('Error accepting join request:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  
  // Deny a join request
  router.put('/deny/:requestId', async (req, res) => {
    const { requestId } = req.params;
  
    try {
      await denyJoinRequest(requestId);
      res.status(200).json({ success: true, message: 'Join request denied successfully' });
    } catch (error) {
      console.error('Error denying join request:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  router.get('/:groupName', async (req, res) => {
    const { groupName } = req.params;

    try {
        const joinRequests = await getJoinRequestsForGroup(groupName);
        res.status(200).json({ success: true, data: joinRequests });
    } catch (error) {
        console.error('Error fetching join requests:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
router.get('/pending/:groupName', async (req, res) => {
  const { groupName } = req.params;

  try {
      // Use the new function to get the pending join request for the specified group
      const pendingJoinRequest = await getPendingJoinRequestForGroup(groupName);

      if (pendingJoinRequest) {
          res.status(200).json({
              success: true,
              data: pendingJoinRequest,
          });
      } else {
          res.status(404).json({
              success: false,
              error: 'No pending join request found for the specified group',
          });
      }
  } catch (error) {
      console.error('Error fetching pending join request:', error);
      res.status(500).json({
          success: false,
          error: 'Internal Server Error',
      });
  }
});

router.get('/:requestId', async (req, res) => {
    const { requestId } = req.params;
  
    try {
      const joinRequest = await getJoinRequestById(requestId);
  
      if (!joinRequest) {
        return res.status(404).json({ success: false, error: 'Join request not found' });
      }
  
      res.status(200).json({ success: true, data: joinRequest });
    } catch (error) {
      console.error('Error fetching join request by ID:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  
  



module.exports = router;
