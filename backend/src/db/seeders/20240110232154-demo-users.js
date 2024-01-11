'use strict';

const { generateSaltAndHash } = require('../../utils/helper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
    const saltHashPairs = [];

    for (let i = 0; i < 8; i++) {
      const pair = await generateSaltAndHash('TestPassword123!');
      saltHashPairs.push(pair);
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
          hash: saltHashPairs[0].hash,
          salt: saltHashPairs[0].salt,
        },
        {
          username: 'JaneSmith',
          firstName: 'Jane',
          lastName: 'Smith',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/1.jpg',
          hash: saltHashPairs[1].hash,
          salt: saltHashPairs[1].salt,
        },
        {
          username: 'MikeBrown',
          firstName: 'Mike',
          lastName: 'Brown',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',
          hash: saltHashPairs[2].hash,
          salt: saltHashPairs[2].salt,
        },
        {
          username: 'LindaGale',
          firstName: 'Linda',
          lastName: 'Gale',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
          hash: saltHashPairs[3].hash,
          salt: saltHashPairs[3].salt,
        },
        {
          username: 'RobertJones',
          firstName: 'Robert',
          lastName: 'Jones',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
          hash: saltHashPairs[4].hash,
          salt: saltHashPairs[4].salt,
        },
        {
          username: 'RebeccaWhite',
          firstName: 'Rebecca',
          lastName: 'White',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/5.jpg',
          hash: saltHashPairs[5].hash,
          salt: saltHashPairs[5].salt,
        },
        {
          username: 'DavidLee',
          firstName: 'David',
          lastName: 'Lee',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/6.jpg',
          hash: saltHashPairs[6].hash,
          salt: saltHashPairs[6].salt,
        },
        {
          username: 'MeganTaylor',
          firstName: 'Megan',
          lastName: 'Taylor',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/7.jpg',
          hash: saltHashPairs[7].hash,
          salt: saltHashPairs[7].salt,
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
