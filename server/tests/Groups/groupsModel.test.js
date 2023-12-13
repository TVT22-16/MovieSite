const { expect } = require('chai');
const { describe, it } = require('mocha');

const { addGroup, getGroups, getGroupbyname, updateGroup, deleteGroup, getGroupsByUser } = require('../../models/groups_model');

describe('Groups API model', () => {

    describe('Get Groups', () => {

        it('Should retrieve all groups from the database', async () => {
            const response = await getGroups();
            expect(response).to.be.an('array');
            expect(response).to.have.length.greaterThan(0);
        });
    });

    describe('Get Group by Name', () => {

        it('Should retrieve group by name from the database', async () => {
            const response = await getGroupbyname('AnkkaJengi');
            expect(response).exist;
        });
    });

    describe('Get Groups by User', () => {

        it('Should retrieve all groups with username from the database', async () => {
            const response = await getGroupsByUser('Roope');
            expect(response).to.be.an('array');
            expect(response).to.have.length.greaterThan(0);
        });
    });

    describe('add Group', () => {

        it('Should add a group to the database', async () => {
            const response = await addGroup('Uusitestausgrouppi', 'Uusitestausgrouppi on vain väliaikainen testausryhmä');
        });
        it('Should not add a group that already exists', async () => {
            try {
                const response = await addGroup('Uusitestausgrouppi', 'Uusitestausgrouppi on vain väliaikainen testausryhmä');
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

    describe('Update group', () => {
        it('Should update a group in the database', async () => {
            const response = await updateGroup('Uusitestausgrouppi', 'Uusitestausgrouppi poistetaan kohta');

        });
        it('Should not update a group that does not exist', async () => {
            try {
                const response = await updateGroup();
            } catch (error) {
                expect(error.response.status).to.equal(500);
            }
        });
    });

    describe('Delete group', () => {
        it('Should delete a group in the database', async () => {
            const response = await deleteGroup('Uusitestausgrouppi');

        });
        it('Should not delete a group that does not exist', async () => {
            try {
                const response = await deleteGroup();
            } catch (error) {
                expect(error.response.status).to.equal(500);
            }
        });
    });
});