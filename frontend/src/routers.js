import React from 'react'
import {BrowserRouter,Redirect,Route,Switch} from 'react-router-dom';
import LayoutAdmin from './layouts/admin';
import LayoutWebsite from './layouts/website';
import AboutPage from './components/about';
import HomePage from './components/home';
import SignUp from './user/Signup';
import SignIn from './user/Signin';
import AddProductPage from './pages/product/add';
import ListProduct from './pages/product/list';
import ProductDetail from './pages/product/detail';
import UpdateProduct from './pages/product/update'
import ListCategory from './pages/category/list';
import PrivateRoute from './user/privateRoute';
import PrivateSignin from './user/privateSignin'
import UserDashboard from './user/userDashboard';
import AddCategory from './pages/category/add';
import UpdateCategory from './pages/category/update';
import ProductPage from './components/ProductPage'
import ListNew from './pages/New/list';
import AddNew from './pages/New/add';
import CateDetail from './pages/category/detail'
import Dashboard from './components/dashboard';
import ListContact from './pages/contact/list'
import News from './components/New'
const Routers = (props) => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/admin/:path?">
                        <LayoutAdmin >
                            <Switch>
                                
                                <Route exact path="/admin/dashboard">
                                    <Dashboard/>
                                </Route>
                              
                                <Route exact path="/admin/product">
                                   <ListProduct {...props}/>
                                </Route>
                                <Route exact path="/admin/category">
                                   <ListCategory {...props}/>
                                </Route>
                                <Route exact path="/admin/product/add">
                                    <AddProductPage {...props} />
                                </Route>
                                <Route exact path="/admin/category/add">
                                    <AddCategory {...props}/>
                                </Route>

                                <Route exact path="/admin/product/update/:id">
                                    <UpdateProduct {...props} />
                                </Route>

                                <Route exact path="/admin/category/update/:id">
                                    <UpdateCategory {...props} />
                                </Route>

                                <Route exact path="/admin/new">
                                    <ListNew {...props} />
                                </Route>

                                <Route exact path="/admin/new/add">
                                    <AddNew {...props} />
                                </Route>

                                <Route exact path="/admin/user">
                                    <UserDashboard {...props} />
                                </Route>
                                <Route exact path="/admin/contact">
                                    <ListContact {...props} />
                                </Route>
                                

                                <PrivateRoute exact path="/admin">
                                    
                                </PrivateRoute>

                                <PrivateSignin exact path="/admin">
                                    
                                </PrivateSignin>    
                               

                                
                            </Switch>
                        </LayoutAdmin>
                        
                    </Route>
                    <Route>
                        <LayoutWebsite>
                            <Switch>
                                <Route exact path="/">
                                    <HomePage {...props} />
                                </Route>
                                <Route exact path="/about">
                                    <AboutPage />
                                </Route>             
                                <Route exact path="/product/:id">
                                    <ProductDetail {...props} />
                                </Route>
                                <Route exact path="/category/:id">
                                    <CateDetail {...props} />
                                </Route>
                                <Route exact path="/signup">
                                    <SignUp/>
                                </Route>
                                <Route exact path="/news">
                                    <News/>
                                </Route>

                                <Route exact path="/signin">
                                    <SignIn/>
                                </Route>
                                
                                <Route exact path="/product">
                                    <ProductPage {...props}/>
                                </Route>
                                <PrivateRoute exact path="/user/userDashboard">
                                    <UserDashboard />
                                </PrivateRoute>
                                <Route path="*">
                                    Not Found Page
                                </Route>
                            </Switch>
                        </LayoutWebsite>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div >
    )
}

export default Routers;
