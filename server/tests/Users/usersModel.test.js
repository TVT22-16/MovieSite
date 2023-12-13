const { expect } = require('chai');
const { describe, it } = require('mocha');

const { addUser, getUsers, getUsernames, updateUser, updateUserAvatar, deleteUser, checkUser } = require('../../models/users_model');

describe('Users API model', () => {

    describe('Get Users', () => {

        it('Should retrieve all users from the database', async () => {
            const response = await getUsers();
            expect(response).to.be.an('array');
            expect(response).to.have.length.greaterThan(0);
        });
    });

    describe('Get Usernames', () => {

        it('Should retrieve all users from the database', async () => {
            const response = await getUsernames();
            expect(response).to.be.an('array');
            expect(response).to.have.length.greaterThan(0);
        });
    });

    describe('add User', () => {

        it('Should add a user to the database', async () => {
            const response = await addUser('SauliNiinistö', 'LennuKoirani', 'default');
        });
        it('Should not add a user that already exists', async () => {
            try {
                const response = await addUser('SauliNiinistö', 'LennuKoirani', 'default');
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
        describe('Update user', () => {
            it('Should update a user in the database', async () => {
                const response = await updateUser('SauliNiinistö', 'LennuOliKoirani', 'gorilla');

            });
            it('Should not update a user that does not exist', async () => {
                try {
                    const response = await updateUser();
                    expect(response).to.not.exist;
                } catch (error) {
                    expect(error.response.status).to.equal(500);
                }
            });
        });

        describe('Check user', () => {

            it('Should check user in the database', async () => {
                try{
                const response = await checkUser('SauliNiinistö', 'LennuMinunKoirani');
                } catch (error) {
                    expect(error.response.status).to.equal(200);
                }
            });
            it('Checked user has invalid password or does not exist', async () => {
                try{
                const response = await checkUser('SauliNiinistö', 'LennuOliKoirani');
                } catch (error) {
                expect(error.response.status).to.equal(401);
                }
            });
        });
        describe('Update user avatar', () => {
            it('Should update a users avatar in the database', async () => {
                const response = await updateUserAvatar('SauliNiinistö', 'landscape');

            });
            it('Should not update a users avatar that does not exist', async () => {
                try {
                    const response = await updateUserAvatar();
                    expect(response).to.not.exist;
                } catch (error) {
                    expect(error.response.status).to.equal(500);
                }
            });

        });

        describe('Delete user', () => {

            it('Should delete a user from the database', async () => {
                const response = await deleteUser('SauliNiinistö');
            });

            it('Should not delete a user that does not exist', async () => {
                try {
                    const response = await deleteUser();
                    expect(response).to.not.exist;
                } catch (error) {
                    expect(error.response.status).to.equal(500); // Adjust based on your error handling
                }
            });
        });
    });