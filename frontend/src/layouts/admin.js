import React from 'react'
import { NavLink } from 'react-router-dom'
const LayoutAdmin = (props) => {
    return (
        <div className="grid grid-cols-[250px,1fr]">

            <div>
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-20 shadow">
                    <NavLink to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Home</NavLink>
                    <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                    <ul className="navbar-nav px-3">
                        
                    </ul>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                            <div className="position-sticky pt-3">
                                <ul className="nav flex-column">
                                    <li className="nav-item">

                                        <NavLink to="/admin/dashboard" className="nav-link active" aria-current="page" >Dashboard</NavLink>

                                    </li>
                                    <li className="nav-item">

                                        <NavLink to="/admin/product" className="nav-link active" aria-current="page" >Product</NavLink>

                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/admin/category" className="nav-link active" aria-current="page" >Category</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/admin/user" className="nav-link active" aria-current="page" >User</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/admin/contact" className="nav-link active" aria-current="page" >Contact</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/admin/new" className="nav-link active" aria-current="page" >News</NavLink>
                                    </li>


                                </ul>



                            </div>
                        </nav>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                           

                            <div>
                                {props.children}
                            </div>

                        </main>
                    </div></div></div>





        </div>




    )
}

export default LayoutAdmin
