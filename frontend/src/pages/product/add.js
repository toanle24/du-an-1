import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import apiProduct from "../../api/productApi";
import CategoryAPI from "../../api/categoryAPI";
const AddProductPage = () => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category, setCategory] = useState([]);
  useEffect(() => {
      const list = async () => {
        try {
          const cate = await CategoryAPI.getAll();
          setCategory(cate.data.categories);
        } catch (error) {
          console.log(error);
        }
      };

      list();
    }, []);

  const onSubmit = (data) => {
    const productImage = data.photo[0];
    const uploads = new FormData();
    uploads.append("name", data.name);
    uploads.append("price", data.price);
    uploads.append("description", data.description);
    uploads.append("shipping", data.shipping);
    uploads.append("category", data.category);
    uploads.append("photo", productImage);
    apiProduct.add(uploads)
    history.push('/admin/product') 
    window.location.reload();
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${
                errors.name ? "border border-danger" : ""
              }`}
              id="product-name"
              placeholder="Tên sản phẩm"
              {...register("name", { required: true })}
            />
            <label htmlFor="product-name">Tên sản phẩm</label>
            {errors.name && (
              <span className="tw-text-red-500">
                Yêu cầu bắt buộc phải nhập
              </span>
            )}
          </div>
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="product-price"
              placeholder="Giá sản phẩm"
              min="0"
              {...register("price", { required: true })}
            />
            <label htmlFor="product-price">Giá sản phẩm</label>
            {errors.price && (
              <span className="tw-text-red-500">
                Yêu cầu bắt buộc phải nhập
              </span>
            )}
          </div>

          <div className="form-floating">
            <input
              type="file"
              className="form-control"
              id="photo"
              placeholder="Giá sản phẩm"
              {...register("photo", { required: true })}
            />
            <label htmlFor="photo">Ảnh</label>
            {errors.photo && (
              <span className="tw-text-red-500">
                Yêu cầu bắt buộc phải nhập
              </span>
            )}
          </div>

          <div className="form-group">
            Category
            <select name="" id="" {...register("category", { required: true })}>
              <option value=""></option>
              {category.map((item, index) => {
                return (
                  <option key={index} value={`${item._id}`}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            {errors.category && (
              <span className="tw-text-red-500">
                Yêu cầu bắt buộc phải nhập
              </span>
            )}
          </div>

          <div className="tw-my-4">
            <label htmlFor="product-price" className="tw-mb-3">
              Mô tả sản phẩm
            </label>

            <textarea
              className="form-control"
              {...register("description", { required: true })}
            ></textarea>
             {errors.description && (
              <span className="tw-text-red-500">
                Yêu cầu bắt buộc phải nhập
              </span>
            )}
          </div>
          <div className="tw-my-4">
            <input type="checkbox" {...register("shipping")} /> Shipping
          </div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
};

export default AddProductPage;
