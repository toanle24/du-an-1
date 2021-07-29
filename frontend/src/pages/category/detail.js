import React,{useState,useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import CategoryAPI from "../../api/categoryAPI";
import ProductApi from "../../api/productApi";
import {API} from "../../config"
const CateDetail = () => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await ProductApi.getAll(id);
        setProducts(data.data);
      
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, [id]);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const cate = async () => {
      try {
        const cate = await CategoryAPI.getAll();
        setCategory(cate.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    cate();
  }, []);
  const newProduct = product.filter((item)=>item.category==id)
  return (
    <div className="container">
    <div className="row mb-2">
      <div className="col-md-3">
        <div className="">
          <div className="col p-4 d-flex flex-column position-static">
          <div style={{ textAlign: "center" }} className="list-group">
             <Link
                  className="list-group-item list-group-item-action"
                  to={`/product`}
                >
                  Product
                
                </Link>
                </div>
            {category.map((item, index) => {
              return (
                <div
                  style={{ textAlign: "center" }}
                  key={index}
                  className="list-group"
                >
                  <Link
                    className="list-group-item list-group-item-action"
                    to={`/category/${item._id}`}
                  >
                    {" "}
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div className="">
          <div className="col p-4 d-flex flex-column position-static">
            <div className="row">
              {newProduct.map((item, index) => (
                    <div key={index} className="col-lg-3">
                      <div className="card text-center">
                        <div
                          className="image image-resize"
                          style={{ paddingTop: "10px" }}
                        >
                          <Link
                            className="hover-image"
                            to={`/product/${item._id}`}
                          >
                            <img
                              className="img mx-auto py-10"
                              src={`${API}/products/photo/${item._id}`}
                              width="200px"
                            />
                          </Link>
                        </div>
                        <div className="card-body">
                          <Link
                            className="btn warning"
                            to={`/product/${item._id}`}
                          >
                            {item.name}
                          </Link>
                          <p className="card-text">Giá bán: ${item.price}</p>
                          <Link
                            to={`/product/${item._id}`}
                            className="btn btn-primary"
                          >
                            Xem thêm
                          </Link>
                        </div>
                      </div>
                      <br />
                    </div>
                  ))
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CateDetail;
