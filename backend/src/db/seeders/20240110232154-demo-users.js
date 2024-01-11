'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'JohnDoe',
          firstName: 'John',
          lastName: 'Doe',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/0.jpg',
        },
        {
          username: 'JaneSmith',
          firstName: 'Jane',
          lastName: 'Smith',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/1.jpg',
        },
        {
          username: 'MikeBrown',
          firstName: 'Mike',
          lastName: 'Brown',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',
        },
        {
          username: 'LindaGale',
          firstName: 'Linda',
          lastName: 'Gale',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
        },
        {
          username: 'RobertJones',
          firstName: 'Robert',
          lastName: 'Jones',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
        },
        {
          username: 'RebeccaWhite',
          firstName: 'Rebecca',
          lastName: 'White',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/5.jpg',
        },
        {
          username: 'DavidLee',
          firstName: 'David',
          lastName: 'Lee',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/male/6.jpg',
        },
        {
          username: 'MeganTaylor',
          firstName: 'Megan',
          lastName: 'Taylor',
          profileImage:
            'https://xsgames.co/randomusers/assets/avatars/female/7.jpg',
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
