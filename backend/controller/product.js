import Product from "../models/product";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash";

export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Them san pham khong thanh cong !!!",
      });
    }

    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: "Ban can nhap day du thong tin",
      });
    }

    // 1kb = 1000
    // 1mb = 100000
    let product = new Product(fields);
    if (files.photo) {
      // if (files.photo.size > 500000) {
      //   return res.status(400).json({
      //     error: "Ban nen upload anh duoi 1mb",
      //   });
      // }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentTyoe = files.photo.path;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Khong them duoc san pham",
        });
      }
      res.json(product);
    });
  });
};

export const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({
        err: "Không tìn thấy sản phẩm !",
      });
    }
    req.product = product;
    next();
  });
};

export const read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

export const remove = (req, res) => {
  let product = req.product;
  product.remove((err, deleteProduct) => {
    if (err) {
      res.status(400).json({
        error: "Không xóa được sản phẩm !",
      });
    }
    res.json({
      Product: deleteProduct,
      message: "Sản phẩm đã được xóa thành công !",
    });
  });
};
export const list = (req, res) => {
  Product.find((err, data) => {
    if (err) {
      error: "Khong tim thay san phaam";
    }
    res.json({ data });
  });
};

export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Update san pham khong thanh cong !!!",
      });
    }

    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: "Ban can nhap day du thong tin",
      });
    }
    let product = req.product;
    product = _.assignIn(product, fields);
    // 1kb = 1000
    // 1mb = 100000
    // let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 100000) {
        return res.status(400).json({
          error: "Ban nen upload anh duoi 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Không update được sản phẩm !!!",
        });
      }
      res.json(product);
    });
  });
};

export const photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

export const productByCategory = (req, res, next, category) => {
  Product.find({ category: category }).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({
        error: "Not found the product"
      })
    }
    req.product = product;
    next();
  })
}

// export const list = (req, res) => {
//     let order = req.query.order ? req.query.order : 'asc';
//     let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
//     let limit = req.query.limit ? +req.query.limit : 6;

//     Product.find()
//         .select("-photo")
//         .populate('category')
//         .sort([[order, sortBy]])
//         .limit(limit)
//         .exec((err, data) => {
//             if (err) {
//                 res.status(400).json({
//                     error: "Product not found"
//                 })
//             }
//             res.json(data)
//         })
// }
// /**
//  * Module này sẽ trả về các sản phẩm có cùng danh mục
//  */
export const listRelated = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 5;

  Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  }) // $ne: not include
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

// export const listCategories = () => {
//   Product.distinct("category", {}, (err, categories) => {
//     if (err) {
//       res.status(400).json({
//         error: "Products not found",
//       });
//     }
//     // res.json(categories);
//   });
// };
// /**
//  * Hiển thị danh sách sản phẩm khi tìm kiếm
//  * Được áp dụng khi tìm kiếm ở react hoặc js project
//  * Hiển thị các danh mục trong checkbox và khoảng giá trong radio buttons
//  * user click vào checkbox và radio buttons
//  * sẽ thiết kế api và hiển thị danh sách sản phẩm mà người dùng tìm kiếm
//  */
// export const listBySearch = () => {
//     let order = req.query.order ? req.query.order : 'asc';
//     let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
//     let limit = req.query.limit ? +req.query.limit : 6;
//     let skip = parseInt(req.body.skip);
//     let findArgs = {}

//     for (let key in req.body.filters) {
//         if (req.body.filters[key].length > 0) {
//             if (key === "price") {
//                 // gte - greater than price [0 - 10]
//                 // lte - nhỏ hơn
//                 findArgs[key] = {
//                     $gte: req.body.filters[key][0],
//                     $lte: req.body.filters[key][1],
//                 };
//             } else {
//                 findArgs[key] = req.body.filters[key];
//             }
//         }
//     }
//     Product.find(findArgs)
//         .select("-photo")
//         .populate("category")
//         .sort([[sortBy, order]])
//         .skip(skip)
//         .limit(limit)
//         .exec((err, data) => {
//             if (err) {
//                 res.status(400).json({
//                     error: "Products not found"
//                 })
//             }
//             res.json({
//                 size: data.length,
//                 data
//             })
//         });
// }
