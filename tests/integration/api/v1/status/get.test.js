test("get to integration/api/v1/status must be 200", async () => {
  const request = await fetch("http://localhost:3000/api/v1/status");
  expect(request.status).toBe(200);
});
