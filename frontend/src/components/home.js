import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { API } from "../config";
import ProductAPI from "../api/productApi"
const HomePage = (props) => {
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
  
  return (
    <div>
      <div className="container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={0}
              className="active"
            />
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={1}
            />
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={2}
            />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/bn/Slide 1 (1).jpg"
                width="1300px"
                height="350px"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img4.thuthuatphanmem.vn/uploads/2020/06/26/hinh-anh-banner-dien-may-thong-minh_033705387.png"
                width="1300px"
                height="350px"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://dienthoainamdinh.jweb.vn/uploads/dienthoainamdinh/images/Banner_2.jpg"
                width="1300px"
                height="350px"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </a>
        </div>

        
        

<section className="text-gray-800 body-font">
  <div className="px-1 py-10 mx-auto">
    <div className="flex flex-col">
     
    </div>
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-40 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src="https://taru.vn/image/cat_images/hmv-thoitrangnam.jpg" />
        </div>
       
      </div>
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-40 overflow-hidden">
          <img alt="content" className="object-cover object-center c"
           src="https://maythucphamhanoi.com/wp-content/uploads/2016/12/banner3.jpg"  />
        </div>
        
      </div>
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-40 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" 
          src="https://giayhuymanh.com/wp-content/uploads/2017/06/banner-huy-manh2.jpg" />
        </div>
        
      </div>
    </div>
  </div>
</section>
    
      <section className="text-gray-600 body-font" style={{width: "1300px"}}>
        <div className=" px-1 py-1 mx-auto flex flex-wrap">
         
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block" 
                src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/bn/Artboard 28.jpg" />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block" 
                src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/bn/Artboard 25.png" />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img alt="gallery" className="w-full h-full object-cover object-center block" 
                src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/bn/Banner%20%C4%90%C3%B4i%201.png" />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img alt="gallery" className="w-full h-full object-cover object-center block"
                 src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/bn/Banner%20%C4%90%C3%B4i%202.png" />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block" 
                src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/bn/Artboard 26.png" />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block"
                 src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/bn/Artboard 27.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="row">
          {products.map((item, index) => (
                <div key={index} className="col-lg-3">
                  <div className="card text-center">
                    <div className="image image-resize" style={{"paddingTop":"10px"}}>
                      <Link className="hover-image" to={`/product/${item._id}`}>
                        <img
                          className="img mx-auto py-10" 
                          src={`${API}/products/photo/${item._id}`} width="200px"  
                        />
                      </Link>
                    </div>
                    <div className="card-body">
                      <Link className="btn warning" to={`/product/${item._id}`}>{item.name}</Link>
                      <p className="card-text">Giá bán: ${item.price}</p>
                      <Link
                        to={`/product/${item._id}`}
                        className="btn btn-primary"
                      >
                        Xem thêm
                      </Link>
                    </div>
                    
                  </div>
                  <br/>
                </div>
              ))
            }

        </div>
              <div className="container">
                <img src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/bn/Artboard%2031.jpg" alt=""/>
              </div>
              <br/>
    </div>
     
    </div>
  );
};

export default HomePage;
