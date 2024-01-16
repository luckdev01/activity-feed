'use strict';

const { generateHashWithSalt } = require('../../utils/helper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
    const hashes = [];

    for (let i = 0; i < 8; i++) {
      // All passwords are the same, but their hashes are different due to the salts.
      const hash = await generateHashWithSalt('TestPassword123!');
      hashes.push(hash);
    }

    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'JohnDoe',
          firstName: 'John',
          lastName: 'Doe',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/0.jpg',
          hash: hashes[0],
        },
        {
          username: 'JaneSmith',
          firstName: 'Jane',
          lastName: 'Smith',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/1.jpg',
          hash: hashes[1],
        },
        {
          username: 'MikeBrown',
          firstName: 'Mike',
          lastName: 'Brown',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',
          hash: hashes[2],
        },
        {
          username: 'LindaGale',
          firstName: 'Linda',
          lastName: 'Gale',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
          hash: hashes[3],
        },
        {
          username: 'RobertJones',
          firstName: 'Robert',
          lastName: 'Jones',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
          hash: hashes[4],
        },
        {
          username: 'RebeccaWhite',
          firstName: 'Rebecca',
          lastName: 'White',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/5.jpg',
          hash: hashes[5],
        },
        {
          username: 'DavidLee',
          firstName: 'David',
          lastName: 'Lee',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/6.jpg',
          hash: hashes[6],
        },
        {
          username: 'MeganTaylor',
          firstName: 'Megan',
          lastName: 'Taylor',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/7.jpg',
          hash: hashes[7],
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "users_id_seq" RESTART',
    );
  },
};
