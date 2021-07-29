import React, { useState } from 'react'
import Layout from '../components/layout';
import { Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn, authenticate, isAuthenticate } from './auth';


const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // let history = useHistory();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const {user} = isAuthenticate();
    const onSubmit = (data) => {
        setLoading(true);
        signIn(data)
            .then(dataUser => {
                if (dataUser.error) {
                    setError(dataUser.error);
                    setLoading(false);
                } else {
                    authenticate(dataUser, () => {
                        setRedirect(true);
                    })
                }
            })
    }
    const showError = () => {
        return <div className="alert alert-danger" style={{ display: error ? "block" : "none" }}>
            {error}
        </div>
    }
    const redirectUser = ()=>{
        if(redirect){
            if(user.role == 1){
                return <Redirect to="/admin"/>
            }else{
                return <Redirect to="/user/userDashboard"/>
            }
        }
    }
    const showLoading = () => {
        return loading && <div className="alert alert-info">
            <h2>...Loading</h2>
        </div>
    }
    const signInForm = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="container">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email của bạn</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        {...register('email')}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        {...register('password')}
                    />
                </div>
                <button className="btn btn-primary">Đăng nhập</button>
            </form>
        )
    }
    return (
        <Layout>
            {redirectUser()}
            {showError()}
            {showLoading()}
            {signInForm()}
        </Layout>
    )
}

export default SignIn
