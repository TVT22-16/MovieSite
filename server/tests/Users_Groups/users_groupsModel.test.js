const { expect } = require('chai');
const { describe, it } = require('mocha');

const { addUserGroup, getUserGroup, getGroupMembers, updateUserGroup, deleteUserGroup, getReviewsForGroup } = require('../../models/users_groups_model');

describe('Users_Groups API model', () => {

    describe('Get Users_Groups', () => {

        it('Should retrieve all users_groups from the database', async () => {
            const response = await getUserGroup();
            expect(response).to.be.an('array');
            expect(response).to.have.length.greaterThan(0);
        });
    });

    describe('Get Group Members', () => {

        it('Should retrieve all users from the database', async () => {
            const response = await getGroupMembers('AnkkaJengi');
            expect(response).to.be.an('array');
            expect(response).to.have.length.greaterThan(0);
        });
    });

    describe('add User_Group', () => {

        it('Should add a user_group to the database', async () => {
            const response = await addUserGroup('testauksenkokeilija', 'testiryhma', 'true');
        });
        it('Should not add a user_group that already exists', async () => {
            try {
                const response = await addUserGroup('testauksenkokeilija', 'testiryhma', 'true');
            } catch (error) {

                if (error && error.message && error.message.includes('duplicate key value violates unique constraint')) {
                    // User already exists, which is expected
                    expect(error).to.exist;
                } else {
                    expect(error.response && error.response.status).to.equal(500);
                }
            }
        });
    });
    describe('Update user_group', () => {
        it('Should update a user_group in the database', async () => {
            const response = await updateUserGroup('testauksenkokeilija', 'testiryhma', 'false');

        });
        it('Should not update a user_group that does not exist', async () => {
            try {
                const response = await updateUserGroup();
            } catch (error) {
                expect(error.response.status).to.equal(500);
            }
        });
    });
    describe('Get Reviews for Group', () => {
            
            it('Should retrieve reviews for group from the database', async () => {
                const response = await getReviewsForGroup('AnkkaJengi');
                expect(response).to.be.an('array');
                expect(response).to.have.length.greaterThan(0);
            });
        });

    describe('Delete user_group', () => {
        it('Should delete a user_group in the database', async () => {
            const response = await deleteUserGroup('testiryhma', 'testauksenkokeilija');

        });
        it('Should not delete a user_group that does not exist', async () => {
            try {
                const response = await deleteUserGroup();
                expect(response).to.not.exist;
            } catch (error) {
                expect(error.response.status).to.equal(500);
            }
        });
    });
});