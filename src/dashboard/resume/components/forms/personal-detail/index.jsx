import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import GlobalApi from "../../../../../../service/GlobalApi";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { Button } from "../../../../../components/ui/button";

const PersonalDetail = ({ setEnableNext }) => {
  // States
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  // Destructuring resume related information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the resume id from url
  const params = useParams();

  /**
   * =========================================================
   *        Functions & Handler Functions - Start
   * =========================================================
   */

  /**
   * Function to remove `http or https` and `www.` from a link
   */
  const extractDomain = (url) => {
    // Remove the protocol (http, https, etc.) and 'www.' prefix
    let domain = url.replace(/^(https?:\/\/)?(www\.)?/, "");
    return domain;
  };

  /**
   * Function to handle the input changes in the resume form.
   */
  const handleInputChange = (e) => {
    // Next button will be disabled at the time of editing information
    setEnableNext(false);

    const { name, value } = e.target;

    // Check if the input field is for the social link
    const processedValue = name === "socialLink" ? extractDomain(value) : value;

    // Update the form data only
    setFormData({
      ...formData,
      [name]: processedValue,
    });

    // Update the resume information
    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo?.attributes,
        [name]: processedValue,
      },
    });
  };

  /**
   * Function to handle the saving of the resume details.
   */
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Define a data variable with the form data
    const data = {
      data: formData,
    };

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
      (res) => {
        setEnableNext(true);
        setLoading(false);
        toast("Resume Update Successfully!");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  /**
   * =========================================================
   *          Functions & Handler Functions - End
   * =========================================================
   */

  return (
    <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
      {/* Heading */}
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the basic information</p>

      {/* Form */}
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-2 my-5 gap-3">
          {/* First Name */}
          <div className="col-span-2 md:col-span-1">
            <Label className="text-sm">First Name*</Label>
            <Input
              name="firstName"
              required
              value={resumeInfo?.attributes?.firstName}
              onChange={handleInputChange}
            />
          </div>
          {/* Last Name */}
          <div className="col-span-2 md:col-span-1">
            <Label className="text-sm">Last Name*</Label>
            <Input
              name="lastName"
              required
              value={resumeInfo?.attributes?.lastName}
              onChange={handleInputChange}
            />
          </div>
          {/* Job Title */}
          <div className="col-span-2">
            <Label className="text-sm">Job Title*</Label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
              value={resumeInfo?.attributes?.jobTitle}
              placeholder="E. g. Frontend Developer"
            />
          </div>
          {/* Email */}
          <div className="col-span-2 md:col-span-1">
            <Label className="text-sm">Email*</Label>
            <Input
              name="email"
              required
              value={resumeInfo?.attributes?.email}
              onChange={handleInputChange}
            />
          </div>
          {/* Social Link */}
          <div className="col-span-2 md:col-span-1">
            <Label className="text-sm">Social Link*</Label>
            <Input
              name="socialLink"
              placeholder="E. g. twitter.com/mohosinh99"
              required
              value={resumeInfo?.attributes?.socialLink}
              onChange={handleInputChange}
            />
          </div>
          {/* Address */}
          <div className="col-span-2">
            <Label className="text-sm">Address*</Label>
            <Input
              name="address"
              required
              onChange={handleInputChange}
              value={resumeInfo?.attributes?.address}
              placeholder="Division, Country"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
