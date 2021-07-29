import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import NewApi from "../../api/NewApi";
const ListNew = (props) => {

    const [ news, setNews] = useState([]);
  useEffect(() => {
    const list = async () => {
      try {
        const newss = await NewApi.getAll();
        setNews(newss.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    list();
  }, []);

  const onRemove = (_id) => {
    props.deleteNews(_id);
    window.location.reload();
  };
    return (
        <div>
        <h1>News</h1>
        <Link to="/admin/new/add" className="btn btn-primary">
          Add News
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item,index) => {
              return (
                <tr key={index}>
                  <td>{index +1}</td>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>
                    
                    <img src={`http://localhost:8000/api/news/photo/${item._id}`} width="150px" />
                  </td>
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
    )
}

export default ListNew
