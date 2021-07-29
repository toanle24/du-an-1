import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {signout, isAuthenticate} from '../user/auth';
import{useHistory} from 'react-router-dom';
import{useLocation} from 'react-router-dom';
const Header = () => {
  const history = useHistory();
  const {pathname} = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const {user} = isAuthenticate()
  useEffect(() => {
      isAuthenticate() && setIsLogged(true)         
  }, [pathname,isLogged])
  
  return (
    <div>



      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a  href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="/" className="nav-link px-2 text-white">Home </Link></li>
              <li><Link to="/about" className="nav-link px-2 text-white">Contact</Link></li>
              <li><Link to="/product" className="nav-link px-2 text-white">Product</Link> </li>

            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/> 
            </form>


            <div className="text-end">

              {!isLogged && (
                <>
                    <a className="btn btn-outline-light me-2" href="/signin">Login</a>

                    <a className="btn btn-warning" href="/signup">Sign-Up</a>
                </>
              )}

              {isLogged &&(
                <>
            <div > 
                   
                  
                     
                          {/* {user.name} */}

                        <Link className="btn btn-outline-light me-2" to={user.role ==1 ? "/admin" : "/user/userDashboard" }>{user.name}</Link> 
                        <a className="btn btn-warning" 
                      style={{cursor:'pointer'}}
                      onClick={()=>signout(()=>{
                      setIsLogged(false)
                      history.push('/')
                       })}
                    >Sign-Out</a>
                  
                   
                  
                    </div>
                </>
              )}

             
            </div>
          </div>

       
     
        </div>
      </header>

    </div>
  )
}

export default Header
