import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/form-section";
import ResumePreview from "../../components/resume-preview";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import Wrapper from "../../../../components/wrapper";
import GoToTopButton from "../../../../components/shared/go-to-top-button";

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const params = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  /**
   * Function to get specific resume information
   */
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(params?.resumeId).then((res) => {
      setResumeInfo(res?.data?.data);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-10 gap-10">
          {/* Form Section */}
          <FormSection />

          {/* Preview Section */}
          <ResumePreview />
        </div>

        {/* Go to top button */}
        <GoToTopButton />
      </Wrapper>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
