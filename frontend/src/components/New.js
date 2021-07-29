import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewApi from "../api/NewApi";
const News = (props) => {
    const [news, setNews] = useState([]);
    useEffect(() => {
      const listTodo = async () => {
        try {
          const newss = await NewApi.getAll();
          setNews(newss.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      listTodo();
    }, []);
    return (
        <div>
            <div className="container">
     
        <div >
          <div className="">
            <div>
              <div className="row">
                {news.map((item, index) => (
                      <div key={index}  className="col">
                        <section className="text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto">
    
    <div className="flex flex-wrap -m-4">
      
      <div className="">
        <div className="bg-gray-100 p-6 rounded-lg">
          <img className="h-40 rounded w-full object-cover object-center mb-6"  
          src={`http://localhost:8000/api/news/photo/${item._id}`} height="300px" alt="content" />
          <p className="leading-relaxed text-base"></p>
          <div className="card-body p-5" >
                           
                            <Link to={`/product/${item._id}`} className="btn btn-primary" >
                             Read More
                            </Link>
                          </div>
        </div>
      </div>
    
    </div>
  </div>
</section>
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
    )
}

export default News
