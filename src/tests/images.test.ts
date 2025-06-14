import request from 'supertest';
import app from '../../src/server'; // 

describe('Image Resize API', () => {
  it('should resize an image and return status 200', async () => {
    const response = await request(app)
      .get('/api/images/resize')
      .query({
        filename: 'fjord.jpg',
        width: '100',
        height: '100'
      });

    expect(response.status).toBe(200);
  });

  it('should return 400 if missing parameters', async () => {
    const response = await request(app).get('/api/images/resize');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should return 500 if file not found', async () => {
    const response = await request(app)
      .get('/api/images/resize')
      .query({
        filename: 'not_found.jpg',
        width: '100',
        height: '100'
      });

    expect(response.status).toBe(500);
  });
});
