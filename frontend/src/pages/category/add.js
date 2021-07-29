import React from 'react'
import { useHistory,  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CategoryAPI from '../../api/categoryAPI';

const AddCategory = () => {
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const uploads = new FormData();
        uploads.append("name", data.name);
        CategoryAPI.add(uploads)
        history.push('/admin/category') // thành công thì chuyển sang trang quản lý product
        alert("Add successful category !!!")
        window.location.reload();
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
            <br/>

            <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'border border-danger' : ''}`}
                            id="product-name"
                            placeholder="Name Category"

                            {...register('name', { required: true })}
                        />
                        <label htmlFor="product-name">Name Category</label>
                        {errors.name && <span className="tw-text-red-500">Yêu cầu bắt buộc phải nhập</span>}

                    </div>
                    <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddCategory
