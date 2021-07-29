import React,{useState,useEffect} from "react";
import contactApi from "../../api/contactApi";

const ListContact = (props) => {
  const onRemove = (_id) => {
    props.contactDelete(_id);
    window.location.reload();

    
  };
  const [contact, setContact] = useState([]);
  useEffect(() => {
    const contact = async () => {
      try {
        const contac = await contactApi.getAll();
        setContact(contac.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    contact();
  }, []);

  return (
    <div>
      <h1>Contact</h1>
     
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contact.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.content}</td>
                
                
                  <td>
                   
                    
                    <button
                      className="btn btn-danger"
                      onClick={() => onRemove(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
           }
        </tbody>
      </table>
    </div>
  );
};

export default ListContact;
