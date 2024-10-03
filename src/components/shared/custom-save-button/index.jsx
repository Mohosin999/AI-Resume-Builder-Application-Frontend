import React from "react";
import { Button } from "../../ui/button";
import { LoaderCircle } from "lucide-react";

const CustomSaveButton = ({ loading, type = "button", handleSave = null }) => {
  return (
    <Button
      type={type}
      disabled={loading}
      onClick={handleSave ? handleSave : undefined}
      size="sm"
      className="w-full md:w-16"
    >
      {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
    </Button>
  );
};

export default CustomSaveButton;
