import React from 'react'
import { Link } from 'react-router-dom'
import {isAuthenticate} from './auth'
const UserDashboard = () => {
    const {user} = isAuthenticate();
    return (
        <div>
            <br/>
            <div className="row">
                <div className="col-4">
                    <div className="card-header">Thanh toán</div>
                    <ul className="list-group">
                        <li  className="list-group-item"><Link to="/card ">Giỏ hàng</Link></li>
                        <li  className="list-group-item"><Link to="/profile ">Thông tin</Link></li>
                    </ul>
                </div>

                <div className="col-8">
                    <div className="card">
                        <div className="card-header">Thông tin khách hàng</div>
                        <ul className="list-group">
                            <li className="list-group-item">Name: {user.name}</li>
                            <li className="list-group-item">Email: {user.email}</li>
                            <li className="list-group-item">Role: {user.role == 1 ? "Admin" : "Regiter User"}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
