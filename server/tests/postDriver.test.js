const { postDriver } = require("../src/controllers/postDriver");
const { Driver, Team } = require('../src/db');
test('should create a new driver', async () => {
  const req = {
    body: {
      name: "John",
      surname: "Doe",
      description: "Driver description",
      image: "image_url",
      nationality: "Nationality",
      dob: "1990-01-01",
      teams: ["Team A", "Team B"]
    }
  };
  const res = {
    status: jest.fn(),
    json: jest.fn()
  };

  // Mock the behavior of Driver.findCreate and Team.findAll
  Driver.findOrCreate = jest.fn().mockResolvedValue([{}, true]);
  Team.findAll = jest.fn().mockResolvedValue([{ name: 'Team A' }, { name: 'Team B' }]);

  await postDriver(req, res);

  // Assert the status code and response
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({
    status: "Driver created successfully",
    driver: expect.any(Object)
  });
});


