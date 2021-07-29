/** Routes for /items */

const express = require("express");

const { Item } = require("./fakeDb");
const router = new express.Router();

/** GET /items : get list of items */
router.get("/", function (req, res, next) {
  return res.json(Item.all());
});

/** POST /items : create a new item and add to list 
 * { name: "lettuce", price: 5 }
*/
router.post("/", function(req, res, next) {
  let newItem = Item.add(req.body.name, req.body.price);
  return res.json({ newItem })
})

/** GET /items/:name : get a single item from the list */
router.get("/:name", function(req, res, next) {
  let item = Item.get(req.params.name);
  return res.json( { item });
})

/** PATCH /items/:name : updates an item and returns it */
router.patch("/:name", function(req, res, next) {
  let item = Item.modify(req.params.name, req.body.name, req.body.price);
  return res.json( { item });
})


/** DELETE /items/:name : if item exists, deletes the item from the list,
 *  and returns { message: "Deleted "}
 */
router.patch("/:name", function(req, res, next) {
  return Item.delete(req.params.name);
})
  
module.exports = router;