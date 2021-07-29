import React, { useState, useEffect } from 'react';
import './tailwind.css';
import ProductAPI from './api/productApi';
import Routers from './routers';
import CategoryAPI from './api/categoryAPI';
import contactApi from './api/contactApi';
import NewApi from './api/NewApi';

function App() {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [contact, setContact] = useState([]);
  const [news, setNews] = useState([]);
 


  const onHandleRemove = async (id) => {
    console.log(id);
    try {
      await ProductAPI.remove(id)

      const newProducts = products.data.filter(item => item._id !== id);
      
      setProducts(newProducts)
      
    } catch (error) {
      console.log(error)
    }
  }


  const onHandleAdd = async (item) => {
    try {
      await ProductAPI.add();
      setProducts([
        ...products,
        item
      ])
    } catch (error) {
      console.log(error.response)
      
    }
  }


  const onHandlUpdate = async (id,product)=>{
      try{
        let{ name, price, description,category, photo}= product;
        // const productImage = photo[0];
        const uploads = new FormData();
        uploads.append("name", name);
        uploads.append("price", price);
        uploads.append("description", description);
        // uploads.append("category", category);
        // uploads.append("photo", productImage)
        
        const submit = await ProductAPI.update(id,uploads);
        if(submit){
          const {data:product} = await ProductAPI.getAll();
          setProducts(product);
        }
      }catch(error){
        console.log(error.response)
      }
  } 
  // CATEGORY
  const addCate = async (item) => {
    try {
      await CategoryAPI.add();
      setProducts([
        ...products,
        item
      ])
    } catch (error) {
      console.log(error.response)
      
    }
  }


  const updateCate = async (id,product)=>{
    try{
      let{ name}= product;
      const uploads = new FormData();
      uploads.append("name", name);
     
      const submit = await CategoryAPI.update(id,uploads);
      if(submit){
        const {data:product} = await CategoryAPI.getAll();
        setProducts(product);
      }
    }catch(error){
      console.log(error.response)
    }
} 

  const removeCate = async (id) => {
    try {
      // Xóa trên API
      await CategoryAPI.remove(id)
      // fake để rerender
      const newProducts = category.data.filter(item => item._id !== id);
      setCategory(newProducts)
      
    } catch (error) {
      console.log(error)
    }
  }

  // contact

  const addContact = async (item) => {
    try {
      await contactApi.add();
      setProducts([
        ...products,
        item
      ])
    } catch (error) {
      console.log(error.response)
      
    }
  }

  const removeContact = async (id) => {
    try {
      // Xóa trên API
      await contactApi.remove(id)
      // fake để rerender
      const newContact = contact.data.filter(item => item._id !== id);
      setContact(newContact)
      
    } catch (error) {
      console.log(error)
    }
  }
  //New

  const addNews = async (item) => {
    try {
      await NewApi.add();
      setProducts([
        ...products,
        item
      ])
    } catch (error) {
      console.log(error.response)
      
    }
  }

  const removeNews = async (id) => {
    try {
      // Xóa trên API
      await NewApi.remove(id)
      // fake để rerender
      const newNews = news.data.filter(item => item._id !== id);
      setNews(newNews)
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="tw-container tw-mx-auto">
      <Routers
       products={products} 
       onDelete={onHandleRemove}
       onAdd={onHandleAdd} 
       onEdit={onHandlUpdate}

      //CATEGORY
      Add={addCate} 
      Delete={removeCate}
      Edit={updateCate}

      // contact
      addContatc={addContact} 
      contactDelete={removeContact}

      //New
      AddNew = {addNews}
      deleteNews={removeNews}
      />

    </div>
  );
}

export default App;
