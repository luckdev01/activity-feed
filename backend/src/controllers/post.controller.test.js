const { default: postController } = require('./post.controller');
const { Post } = require('../models');

describe('Post Controller', () => {
  describe('get posts', () => {
    it('should return paginated posts', async () => {
      // Mock the Post.findAll method
      const findAllMock = jest.spyOn(Post, 'findAll');
      const samplePosts = [
        { title: 'Post 1', content: 'Content 1' },
        { title: 'Post 2', content: 'Content 2' },
      ];
      findAllMock.mockResolvedValueOnce(samplePosts);

      // Mock req and res objects
      const req = { query: { offset: '1', limit: '2' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the controller function
      await postController.get(req, res);

      // Assertions
      expect(findAllMock).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.any(Array),
          order: [['timeStamp', 'DESC']],
          offset: 1,
          limit: 2,
        }),
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(samplePosts);
    });
  });
});
