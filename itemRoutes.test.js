process.env.NODE_ENV = "test";

const request = require("supertest");
const { response } = require("./app");
const app = require("./app");
const Items = require("./fakeDb");

const testItem = { name: 'popsicle', price: 1.45};

beforeEach(function () {
  Items.add(testItem.name, testItem.price);
})

/** GET /items - returns list of items like:
 * { items: [item, ...]} 
 */
describe("GET /items", function() {
  test("Gets a list of all items", async function() {
    const response = await request(app).get('/items');
    expect(response.body).toEqual({ items: [testItem] });
  });
});

/** GET /items/:name - return data about one item like:
 *  { name: itemName, price: itemPrice } 
 */
describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${testItem.name}`);
    expect(response.body).toEqual(testItem);
  });

  test("Respond with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/not-on-list`);
    expect(response.statusCode).toEqual(404);
  });
});

/** POST /items/:name - return new item like:
 *  { added: { name: itemName, price: itemPrice } }
 */
describe("POST /items", function () {
  test("Creates a new item", async function () {
    const response = await request(app)
      .post('/items')
      .send({ name: "chips", price: 2.5 });
    expect(response.body).toEqual({ added: { name: "chips", price: 2.5 } });
  });
});

/** PATCH /items/:name - modifies an item and returns it like:
 *  { updated: { name: "newItemName", price: newItemPrice } }
 */
describe("PATCH /items/:name", function () {
  test("Modifies an existing item", async function () {
    const response = await request(app)
      .patch(`/items/${testItem.name}`)
      .send({ name: "Ice Cream" });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ updated: { name: "Ice Cream" }});
  });

  test("Respond with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/not-on-list`);
    expect(response.statusCode).toEqual(404);
  });
});