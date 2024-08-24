import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";

const PersonalDetail = ({ setEnableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (e) => {
    // Next button will be disabled at the time of editing information
    setEnableNext(false);

    const { name, value } = e.target;

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEnableNext(true);
  };

  return (
    <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
      {/* Heading */}
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the basic information</p>

      {/* Form */}
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          {/* First Name */}
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" required onChange={handleInputChange} />
          </div>
          {/* Last Name */}
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" required onChange={handleInputChange} />
          </div>
          {/* Job Title */}
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" required onChange={handleInputChange} />
          </div>
          {/* Address */}
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" required onChange={handleInputChange} />
          </div>
          {/* Phone */}
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" required onChange={handleInputChange} />
          </div>
          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" required onChange={handleInputChange} />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-3 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
