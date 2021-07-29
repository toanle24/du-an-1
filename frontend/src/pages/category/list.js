import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryAPI from "../../api/categoryAPI";
const ListCategory = (props) => {
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
 

  const onRemove = (_id) => {
    props.Delete(_id);
    window.location.reload();
  };
  return (
    <div>
      <h1>Category</h1>
      <Link to="/admin/category/add" className="btn btn-primary">
        Add Categories
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/admin/category/update/${item._id}`}
                  >
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
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
};

export default ListCategory;
