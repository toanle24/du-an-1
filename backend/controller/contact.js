import Contact from '../models/contact';
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
  
      const { name, email, content } = fields;
      if (!name || !email || !content) {
        return res.status(400).json({
          error: "Ban can nhap day du thong tin",
        });
      }
     
      let contact = new Contact(fields);
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Ban nen upload anh duoi 1mb",
          });
        }
        contact.photo.data = fs.readFileSync(files.photo.path);
        contact.photo.contentTyoe = files.photo.path;
      }
  
      contact.save((err, contact) => {
        if (err) {
          return res.status(400).json({
            error: "Khong them duoc san pham",
          });
        }
        res.json(contact);
      });
    });
  };

export const contactById = (req, res, next, id) => {
    Contact.findById(id).exec((err, contact) => {
        if (err || !contact) {
            res.status(400).json({
                err: "Không tìn thấy sản phẩm !"
            })
        }
        req.contact = contact;
        next();
    })
}


export const remove = (req, res) => {
    let contact = req.contact;
    contact.remove((err, deleteContact) => {
        if (err) {
            res.status(400).json({
                error: "Không xóa được sản phẩm !"
            })
        }
        res.json({
            Contact: deleteContact,
            message: "Sản phẩm đã được xóa thành công !"
        })
    })
}
export const list = (req, res) => {
    Contact.find((err, data) => {
        if (err) {
            error: "Khong tim thay san phaam"
        }
        res.json({ data })
    })
}
