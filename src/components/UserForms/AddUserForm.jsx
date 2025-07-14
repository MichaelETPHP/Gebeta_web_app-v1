import { useState ,useEffect } from "react";
import UseHttp from "../../services/UseHttp";
import Loading from "../Loading/Loading";

const AddUserForm = () => {
  const {post , loading , error} = UseHttp();
  const [errorMg , setErrorMg ] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    role: "Customer",
  });
  const handelSubmit = async () => {

    if(formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.phone === "" || formData.password === "" || formData.passwordConfirm === "" || formData.role === ""){
        setErrorMg("All fields are required");
        return;
    }else if(formData.password !== formData.passwordConfirm){
        setErrorMg("Passwords do not match");
        return;
    }else{
        setErrorMg("");
    }
    const res = await post("/api/v1/users" , formData , {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmQxMTQwNTk2ZWI2YmE5Njk2YTlkMSIsImlhdCI6MTc1MjE0OTc2NiwiZXhwIjoxNzU5OTI1NzY2fQ.sO42ZBDcDCRtAtK5R1LM_YLwD6FgZvgZthJ-Sx5a_ic`,
        },
    });


    //   console.log(formData)
     
        }

        useEffect(()=>{
            const sanitizedPhone =
          formData.phone.startsWith("0")
            ? formData.phone.slice(1)
            : formData.phone;
            setFormData({ ...formData, phone: sanitizedPhone });
        },[formData.phone])
    return (
    <>
      <div className="font-noto">
        <div className="flex gap-4 ">
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border border-gray rounded-lg h-[35px]"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value.trim() })}
              required
            />
          </div>

          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full p-2 border border-gray rounded-lg h-[35px]"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value.trim() })}
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray rounded-lg h-[35px]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value.trim() })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              className="w-full p-2 border border-gray rounded-lg h-[35px]"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.trim() })}
              required
            />
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="text"
              name="password"
              className="w-full p-2 border border-gray rounded-lg h-[35px]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value.trim() })}
              required
            />
          </div>
          <div className="flex flex-col justify-center">
            <label>Confirm Password</label>
            <input
              type="text"
              name="passwordConfirm"
              className="w-full p-2 border border-gray rounded-lg h-[35px]"
              value={formData.passwordConfirm}
              onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value.trim() })}
              required
            />
          </div>
        </div>
        <div className="flex mt-2">

        <select
          name="role"
          className="w-fit m-2 flex self-center justify-self-center p-2 border border-gray rounded-lg "
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option className="hidden" value="">Select Role</option>
          <option className="" value="Customer">Customer</option>
          <option className="" value="Manager">Manager</option>
          <option className="" value="Employee">Employee</option>
        </select>
        </div>
      </div>
      <div className="flex justify-end ">
        {loading && <Loading /> } 
        {errorMg && <p className="text-red-500">{errorMg}</p>}
        <div>

        <button className="bg-primary text-white p-2 rounded-lg hover:bg-white hover:text-primary border border-gray transition-all duration-300 mt-4 ml-16" onClick={()=>handelSubmit()}>Add User</button>
        </div>
    </div>
    </>
  );
};

export default AddUserForm;
