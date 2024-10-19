import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GlobalApi from "../../../../../../service/GlobalApi";
import { ResumeInfoContext } from "../../../../../context/ResumeInfoContext";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import CustomParagraph from "../../../../../components/ui/CustomParagraph";
import FormWrapper from "../../../../../components/form-wrapper";
import CustomSaveButton from "../../../../../components/shared/custom-save-button";

/**
 * PersonalDetail component.
 *
 * @param {Function} setEnableNext - Function to enable or disable the next button based on form completion.
 * @returns {JSX.Element}
 */
const PersonalDetail = ({ setEnableNext }) => {
  // States
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  // State to track input changes
  const [inputChanged, setInputChanged] = useState(false);

  // Destructuring resume related information from context
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Get the resume id from url
  const params = useParams();

  // Effect to set the next button state based on resumeInfo
  useEffect(() => {
    if (
      resumeInfo?.attributes?.firstName &&
      resumeInfo?.attributes?.lastName &&
      resumeInfo?.attributes?.jobTitle &&
      resumeInfo?.attributes?.email &&
      resumeInfo?.attributes?.socialLink &&
      resumeInfo?.attributes?.address &&
      !inputChanged
    ) {
      setEnableNext(true);
    } else if (
      resumeInfo?.attributes?.firstName &&
      resumeInfo?.attributes?.lastName &&
      resumeInfo?.attributes?.jobTitle &&
      resumeInfo?.attributes?.email &&
      resumeInfo?.attributes?.socialLink &&
      resumeInfo?.attributes?.address &&
      inputChanged
    ) {
      setEnableNext(false);
    } else {
      setEnableNext(false);
    }
  }, [resumeInfo, inputChanged]);

  /**
   * =========================================================
   *        Functions & Handler Functions - Start
   * =========================================================
   */

  /**
   * Function to remove http or https and www. from a link
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
    setInputChanged(true);
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
    <FormWrapper>
      {/* Heading */}
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <CustomParagraph>
        You must provide your personal information here to go ahead.
      </CustomParagraph>

      {/* Form */}
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-2 my-5 gap-3">
          {/* First Name */}
          <div className="col-span-2 md:col-span-1">
            <Label className="text-base">First Name*</Label>
            <Input
              name="firstName"
              placeholder="Jhon"
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
              placeholder="Doe"
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
              placeholder="E. g. Frontend Developer"
              required
              onChange={handleInputChange}
              value={resumeInfo?.attributes?.jobTitle}
            />
          </div>
          {/* Email */}
          <div className="col-span-2 md:col-span-1">
            <Label className="text-sm">Email*</Label>
            <Input
              name="email"
              placeholder="jhondoe@example.com"
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
              placeholder="Division, Country"
              required
              onChange={handleInputChange}
              value={resumeInfo?.attributes?.address}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-3 flex justify-end">
          <CustomSaveButton type={"submit"} loading={loading} />
        </div>
      </form>
    </FormWrapper>
  );
};

PersonalDetail.propTypes = {
  setEnableNext: PropTypes.func.isRequired,
};

export default PersonalDetail;
