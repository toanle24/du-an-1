import Category from '../models/category';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash'


// export const create = (req, res) => {
//     const category = new Category(req.body);
//     category.save((err, data) => {
//         if (err) {
//             res.status(400).json({
//                 error: "Khong them duoc danh muc"
//             })
//         }
//         res.json({ data, message: "Thêm danh mục thành công!!!" });
//     })
// }

export const create = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        if (err) {
            return res.status(400).json({
                error: "Thêm danh mục thành công !!!"
            })

        }

        const { name } = fields;

        if (!name) {
            return res.status(400).json({
                error: "Bạn cần nhập đủ thông tin !!!"
            })
        }


        // 1kb = 1000
        // 1mb = 100000 
        let category = new Category(fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Ban nen upload anh duoi 1mb"
                })
            }
            category.photo.data = fs.readFileSync(files.photo.path);
            category.photo.contentTyoe = files.photo.path;
        }


        category.save((err, category) => {
            if (err) {
                return res.status(400).json({
                    error: "Khong them duoc san pham"
                })
            }
            res.json(category)
        })

    })
}
////

export const list = (req, res) => {
    Category.find((err, categories) => {
        if (err) {
            req.status(400).json({
                error: "Danh mục không tồn tại !!!"
            })
        }
        res.json({ categories });
    })
}


export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                err: 'Danh mục không tồn tại !!!'
            })
        }

        req.category = category;

        next();
    })
}
export const read = (req, res) => {
    return res.json(req.category)
}


// export const update = (req, res) => {
//     const category = req.category;
//     // const category = req.body;
//     category.names = req.body.names;
//     Category = _.assignIn(Category, fields);

//     category.save((err, data) => {
//         if (err || !category) {
//             return res.status(400).json({
//                 error: "Không sửa được sản phẩm !"
//             })
//         }
//         res.json(data);
//     })
// }

// export const update = (req, res) => {

//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "Update sản phẩm không thành công !!! !!!"
//             })

//         }
//         let category = req.category;
//         category = _.assignIn(category, fields);

//         category.save((err, data) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: "Không update được sản phẩm !!!"
//                 })
//             }
//             res.json(data,"Update sản phẩm thành công !!!")
//         })

//     })
// }


export const update = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Update danh mục không thành công !!!"
            })

        }

        const { name } = fields;
        if (!name) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin !!!"
            })
        }
        let category = req.category;
        category = _.assignIn(category, fields);

        // let product = new Product(fields);
        if (files.photo) {
            if (files.photo.size > 100000) {
                return res.status(400).json({
                    error: "Ban nen upload anh duoi 1mb"
                })
            }
            category.photo.data = fs.readFileSync(files.photo.path);
            category.photo.contentTyoe = files.photo.path;
        }

        category.save((err, category) => {
            if (err) {
                return res.status(400).json({
                    error: "update duoc san pham"
                })
            }
            res.json(category)
        })

    })
}


export const remove = (req, res) => {
    let category = req.category;

    category.remove((err, deleteCategory) => {
        if (err || !category) {
            res.status(400).json({
                error: "Không xóa được danh mục sản phẩm !!!"
            })
        }
        res.json({
            category: deleteCategory,
            message: "Xóa danh mục thành công !!!"
        })
    })
}

export const photo = (req, res, next) => {
    if (req.category.photo.data) {
        res.set("Content-Type", req.category.photo.contentType);
        return res.send(req.category.photo.data);
    }
    next();
}