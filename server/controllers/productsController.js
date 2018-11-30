import Product from "./../models/productModel";

/**
 * POST /api/product
 * addNewProduct
 */
export let postProduct = (req, res) => {
  let newProduct = new Product(req.body);

  newProduct.save((err, product) => (err ? res.send(err) : res.json(product)));
};

/**
 * GET /api/product
 * getProducts
 */
export let getProducts = (req, res) => {
  Product.find({}, (err, product) => (err ? res.send(err) : res.json(product)));
};

/**
 * GET /api/product/5
 * getProductWithId
 */
export let getProduct = (req, res) => {
  Product.findById(req.params.productId, (err, product) => {
    if (err) res.send(err);

    /* TODO: Search by code */
    // if (!product) {
    //   Product.find({ code: req.params.code }, (err, product) =>
    //     err ? res.send(err) : res.json(product)
    //   );
    // }

    res.json(product);
  });
};

/**
 * PUT /api/product/5
 * updateProduct
 */
export let putProduct = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    { new: true },
    (err, product) => (err ? res.send(err) : res.json(product))
  );
};

/**
 * DELETE /api/product/5
 * deleteProduct
 */
export let deleteProduct = (req, res) => {
  Product.remove({ _id: req.params.productId }, err =>
    err ? res.send(err) : res.json({ message: "Successfully deleted product" })
  );
};
