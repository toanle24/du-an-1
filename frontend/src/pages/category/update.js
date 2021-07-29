import React, {useState,useEffect} from 'react'
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import CategoryAPI from '../../api/categoryAPI';
const UpdateCategory = ({Edit}) => {

    const { id } = useParams();
  const [product, setProduct] = useState();
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    await Edit(id, data);
    history.push("/admin/category");
    
  };

  useEffect(() => {
    //lay thong tin san pham
    const getProduct = async () => {
      const { data: response } = await CategoryAPI.get(id);
      setProduct(response);

      for (const key in response) {
        setValue(key, response[key]);
      }
    };
    getProduct();
  }, []);

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

export default UpdateCategory
