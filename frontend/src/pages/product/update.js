import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import apiProduct from "../../api/productApi";
// import { API } from "../../config";
import CategoryAPI from "../../api/categoryAPI";
const UpdateProduct = ({ onEdit }) => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const onSubmit = async (data) => {
    await onEdit(id, data);
    history.push("/admin/product");
  };
  // const [category, setCategory] = useState([]);
  // useEffect(() => {
  //     const list = async () => {
  //       try {
  //         const cate = await CategoryAPI.getAll();
  //         setCategory(cate.data.categories);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     list();
  //   }, []);

  useEffect(() => {
    const getProduct = async () => {
      const { data: response } = await apiProduct.get(id);
      setProduct(response);
      reset(response)

     

    };
    getProduct();
  }, []);

  return (
    <div>
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
              {...register("price", { required: true })}
            />
            <label htmlFor="product-price">Giá sản phẩm</label>
          </div>

          <div className="form-floating">
            <input type="file" className="form-control" id="photo" 
            //  {...register("photo", { required: true })}
            />
            
            <label htmlFor="photo">Ảnh</label>
            
          </div>
          <div className="tw-my-4">
            <label htmlFor="product-price" className="tw-mb-3">
              Mô tả sản phẩm
            </label>

            {/* <div className="form-group">
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
          </div> */}

            <textarea
              className="form-control"
              {...register("description", { required: true })}
            ></textarea>
          </div>
          <div className="tw-my-4">
            <input type="checkbox" {...register("shipping")} /> Shipping
          </div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
