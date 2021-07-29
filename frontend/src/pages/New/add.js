import React from 'react'
import { useHistory  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NewApi from '../../api/NewApi';

const AddNew = () => {
    let history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const productImage = data.photo[0];
        const uploads = new FormData();
        uploads.append("title", data.title);
        uploads.append("content", data.content);
        uploads.append("photo", productImage);
        NewApi.add(uploads)
        // history.push('/admin/new') // thành công thì chuyển sang trang quản lý product
        alert("Add successful category !!!")
        // window.location.reload();
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
            <br/>

            <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.title ? 'border border-danger' : ''}`}
                            id="title"
                            placeholder="Title"

                            {...register('title', { required: true })}
                        />
                        <label htmlFor="title">Title</label>
                        {errors.title && <span className="tw-text-red-500">Yêu cầu bắt buộc phải nhập</span>}

                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.contnet ? 'border border-danger' : ''}`}
                            id="content"
                            placeholder="Content"

                            {...register('content', { required: true })}
                        />
                        <label htmlFor="content">Content</label>
                        {errors.content && <span className="tw-text-red-500">Yêu cầu bắt buộc phải nhập</span>}

                    <div className="form-floating">
                            <input
                            type="file"
                            className="form-control"
                            id="photo"
                            placeholder="Giá sản phẩm"
                            {...register("photo", { required: true })}
                            />
                            <label htmlFor="photo">Ảnh</label>
                            {errors.photo && (
                            <span className="tw-text-red-500">
                                Yêu cầu bắt buộc phải nhập
                            </span>
                    )}
                </div>

                      
                    </div>
                    <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddNew
