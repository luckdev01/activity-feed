'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert('posts', [
      {
        userId: 1,
        postContent: 'Just closed a deal with XYZ Corp! Exciting times ahead.',
        likeCount: 58,
        timeStamp: new Date('2023-08-01T14:00:00Z'),
      },
      {
        userId: 2,
        postContent:
          'Looking for recommendations on CRM tools. Any suggestions?',
        likeCount: 23,
        timeStamp: new Date('2023-08-03T16:45:00Z'),
      },
      {
        userId: 3,
        postContent:
          'Attending the Global Business Conference next week. Who else is going?',
        likeCount: 76,
        timeStamp: new Date('2023-08-04T10:15:00Z'),
      },
      {
        userId: 4,
        postContent: "Great insights from today's webinar on market strategy!",
        likeCount: 42,
        timeStamp: new Date('2023-08-05T09:30:00Z'),
      },
      {
        userId: 5,
        postContent: 'Our Q3 projections are looking promising!',
        likeCount: 64,
        timeStamp: new Date('2023-08-06T08:15:00Z'),
      },
      {
        userId: 6,
        postContent: 'Successfully launched our new product line today.',
        likeCount: 81,
        timeStamp: new Date('2023-08-07T17:45:00Z'),
      },
      {
        userId: 7,
        postContent: 'Exciting collaboration coming up with ABC Tech.',
        likeCount: 29,
        timeStamp: new Date('2023-08-08T11:10:00Z'),
      },
      {
        userId: 8,
        postContent:
          "Engaging workshop on leadership skills tomorrow. Can't wait!",
        likeCount: 38,
        timeStamp: new Date('2023-08-09T13:20:00Z'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "posts_id_seq" RESTART',
    );
  },
};
