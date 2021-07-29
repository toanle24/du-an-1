import News from '../models/News';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';


export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Them san pham khong thanh cong !!!",
        });
      }
  
      const { title, content } = fields;
      if ( !title || !content) {
        return res.status(400).json({
          error: "Ban can nhap day du thong tin",
        });
      }
     
      let newss = new News(fields);
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Ban nen upload anh duoi 1mb",
          });
        }
        newss.photo.data = fs.readFileSync(files.photo.path);
        newss.photo.contentTyoe = files.photo.path;
      }
  
      newss.save((err, newss) => {
        if (err) {
          return res.status(400).json({
            error: "Khong them duoc san pham",
          });
        }
        res.json(newss);
      });
    });
  };

export const newsById = (req, res, next, id) => {
    News.findById(id).exec((err, newss) => {
        if (err || !newss) {
            res.status(400).json({
                err: "Không tìn thấy sản phẩm !"
            })
        }
        req.newss = newss;
        next();
    })
}


export const remove = (req, res) => {
    let newss = req.newss;
    newss.remove((err, deleteNews) => {
        if (err) {
            res.status(400).json({
                error: "Không xóa được sản phẩm !"
            })
        }
        res.json({
            News: deleteNews,
            message: "Sản phẩm đã được xóa thành công !"
        })
    })
}
export const list = (req, res) => {
    News.find((err, data) => {
        if (err) {
            error: "Khong tim thay san phaam"
        }
        res.json({ data })
    })
}


export const photo = (req, res, next) => {
  if (req.newss.photo.data) {
    res.set("Content-Type", req.newss.photo.contentType);
    return res.send(req.newss.photo.data);
  }
  next();
};