import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import CategoryAPI from "../../api/categoryAPI";
import ProductAPI from "../../api/productApi";
import { API } from "../../config";
const ListProduct = (props) => {
  const onRemove = (_id) => {
    props.onDelete(_id);
    window.location.reload();

    
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const listTodo = async () => {
      try {
        const pro = await ProductAPI.getAll();
        setProducts(pro.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    listTodo();
  }, []);

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
  return (
    <div>
      <h1>Product Page</h1>
      <Link to="/admin/product/add" className="btn btn-primary">
        Thêm sản phẩm
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>cate</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                 <td> {category.map((items,index) => {     
                   if(items._id == item.category){
                      return(
                        <div key={index}>
                           {items.name}
                        </div>
                      )
                   }          
              })}
              </td>
                  <td>
                    
                    <img src={`${API}/products/photo/${item._id}`} width="150px" />
                  </td>
                  <td>
                    <a className="btn btn-warning" href={`/admin/product/update/${item._id}`}>
                      Edit
                    </a>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => onRemove(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
           }
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
