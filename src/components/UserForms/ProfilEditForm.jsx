import { useState, useEffect } from "react";
import UseHttp from "../../services/UseHttp";
import Loading from "../Loading/Loading";
import { useUserProfile } from "../../contexts/UserProfileContext";

const ProfileEditForm = () => {
  const { userProfile, setUserProfile } = useUserProfile();
  const { patch, loading, error } = UseHttp();
  const [loadingMG, setLoadingMG] = useState(false);
  const [errorMG, setErrorMG] = useState(false);
  const [formData, setFormData] = useState({
    username: "Estifanos ",
    firstName: "Estifanos",
    lastName: "Girma",
    email: "estifanosgirma@gmail.com",
    phoneNumber: "0911111111",
    restaurantName: "Gebeta Restaurant",
    restaurantAddress: "Ayertena",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await patch("/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      //   if (response.status === 200) {
      if (loading) {
        alert("Profile updated successfully!");
        setUserProfile(false);
      }
      //   }
    } catch (err) {
      alert("Failed to update profile.");
      console.error(err);
    }
    alert("Profile updated successfully!");
    setUserProfile(false);
  };

  return (
    <>
      <div className="flex ">
        <div className="flex flex-col gap-2 p-2">
          <div className="p-10 bg-[url('/src/assets/images/restaurant.jpg')] bg-cover bg-center h-[200px] w-[230px] rounded-xl" />
          <div>
            <input
              className="border border-gray rounded-lg p-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-white hover:file:text-primary file:border-gray w-[230px]"
              type="file"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 text-sm justify-center p-5"
        >
          <div>
            <label
              className="block text-l font-medium text-primary "
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full border-[0.5px] border-gray p-2 rounded-lg"
              name="username"
              type="text"
              placeholder=""
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-10">
            <div>
              <label
                className="block text-sm font-medium text-primary"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full border-[0.5px] border-gray p-2 rounded-lg"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-primary"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full border-[0.5px] border-gray p-2 rounded-lg"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-primary"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full border-[0.5px] border-gray p-2 rounded-lg"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-10">
            <div>
              <label
                className="block text-sm font-medium text-primary"
                htmlFor="restaurantName"
              >
                Restaurant Name
              </label>
              <input
                className="w-full border-[0.5px] border-gray p-2 rounded-lg"
                name="restaurantName"
                type="text"
                placeholder="Restaurant Name"
                value={formData.restaurantName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-primary"
                htmlFor="restaurantAddress"
              >
                Restaurant Address
              </label>
              <input
                className="w-full border-[0.5px] border-gray p-2 rounded-lg"
                name="restaurantAddress"
                type="text"
                placeholder="Restaurant Address"
                value={formData.restaurantAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-primary"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="w-full border-[0.5px] border-gray p-2 rounded-lg"
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-[250px]  h-[100px] -translate-y-4">
            <div className="flex self-center items-self-center ">
              {loading && <Loading />}
              {errorMG && <p className="text-red-500">{errorMG}</p>}
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-primary text-white p-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 border border-gray"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileEditForm;
