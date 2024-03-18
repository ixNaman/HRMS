import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../../Actions/authTypes";
import { ToastContainer, toast } from "react-toastify";
import {
  GithubLogo,
  Globe,
  InstagramLogo,
  MetaLogo,
  TwitterLogo,
} from "@phosphor-icons/react";

const Profile: React.FC = () => {
  const username = useSelector(
    (state: { auth: AuthState }) => state.auth.username
  );

  const [employee, setEmployee] = useState<any>(); // State to manage employee data
  const [newPhoto, setNewPhoto] = useState<string | null>(null); // State to manage the new photo

  // Function to handle photo change
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Load employee data from localStorage
  const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");

  // Find employee by username
  const currentEmployee = employeeData.find(
    (emp: { name: string }) => emp.name === username
  );

  // Update employee state when it's found
  if (currentEmployee && !employee) {
    setEmployee(currentEmployee);
  }

  // Function to save changes
  const saveChanges = () => {
    if (employee && newPhoto) {
      const updatedEmployee = { ...employee, photo: newPhoto };
      // Update employee in localStorage
      const updatedEmployees = employeeData.map((emp: any) => {
        if (emp.name === username) {
          return updatedEmployee;
        }
        return emp;
      });
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      // Update state
      setEmployee(updatedEmployee);
      setNewPhoto(null);
      toast.success("Profile Updated Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="bg-gray-200 py-8">
      <div className="container mx-auto   ">
        <div className="flex flex-col lg:flex-row ">
          <div className="lg:w-1/3 mb-8 ml-6 mr-6 lg:mb-0">
            <div className="bg-white rounded-lg shadow-md mb-8 p-6 text-center">
              <img
                src={employee ? employee.photo : ""}
                alt="avatar"
                className="rounded-full mx-auto mb-4 "
                style={{ width: "150px" }}
              />
              <p className="text-gray-600 mb-2">
                {employee ? employee.position : ""}
              </p>
              <p className="text-gray-600 mb-4">
                {employee ? employee.address : ""}
              </p>
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={saveChanges}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <ul className="list-none">
                <li className="flex justify-between items-center p-3 border-b">
                  <span>
                    <Globe size={32} className=" hover:text-yellow-500" />
                  </span>

                  <span>https://@Innovatechs.com</span>
                </li>
                <li className="flex justify-between items-center p-3 border-b">
                  <span>
                    <GithubLogo size={32} className=" hover:text-gray-700" />
                  </span>
                  <span>@Innovatechs</span>
                </li>
                <li className="flex justify-between items-center p-3 border-b">
                  <span>
                    <TwitterLogo size={32} className=" hover:text-blue-500" />
                    <i className="fab fa-twitter fa-lg"></i>
                  </span>
                  <span>@Innovatechs</span>
                </li>
                <li className="flex justify-between items-center p-3 border-b">
                  <InstagramLogo size={32} className=" hover:text-purple-700" />
                  <span></span>
                  <span>@Innovatechs</span>
                </li>
                <li className="flex justify-between items-center p-3">
                  <span className="mr-20  ">
                    <MetaLogo size={32} className=" hover:text-blue-500" />
                  </span>
                  <span className="text-blue-700"></span>
                  <span>@Innovatechs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-2/3 border-2 ">
            <div className="bg-white rounded-lg shadow-md mb-8 p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Full Name</span>
                  <span className="text-gray-600">
                    {employee ? employee.name : ""}{" "}
                    {employee ? employee.lastName : ""}
                  </span>
                </div>
                <hr className="border-gray-300 mb-4" />
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Email</span>
                  <span className="text-gray-600">
                    {employee ? employee.email : ""}
                  </span>
                </div>
                <hr className="border-gray-300 mb-4" />
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Age</span>
                  <span className="text-gray-600">
                    {employee ? employee.age : ""}
                  </span>
                </div>
                <hr className="border-gray-300 mb-4" />
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Mobile</span>
                  <span className="text-gray-600">
                    {employee ? employee.phoneNumber : ""}
                  </span>
                </div>
                <hr className="border-gray-300 mb-4" />
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Department</span>
                  <span className="text-gray-600">
                    {employee ? employee.department : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 mb-4 lg:pr-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <span className="text-primary font-italic mb-4 block">
                    Skills
                  </span>
                  <span className="text-sm mb-1 block">Backend</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                  <span className="text-sm mb-1 block">Website Markup</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                  <span className="text-sm mb-1 block">One Page</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                  <span className="text-sm mb-1 block">Mobile Template</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                  <span className="text-sm mb-1 block">Backend API</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 mb-4 lg:pl-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <span className="text-primary font-italic mb-4 block">
                    Assignment Project Status
                  </span>
                  <span className="text-sm mb-1 block">Web Design</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                  <span className="text-sm mb-1 block">Website Markup</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                  <span className="text-sm mb-1 block">One Page</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                  <span className="text-sm mb-1 block">Mobile Template</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                  <span className="text-sm mb-1 block">Backend API</span>
                  <div className="border rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 text-white py-1 px-2 w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </section>
  );
};
export default Profile;
