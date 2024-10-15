import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../../../components/ui/button";
import { LayoutGrid } from "lucide-react";
import { useContext, useState } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from "sonner";

const ThemeColor = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const { resumeId } = useParams();

  /**
   * Function to handle color after select
   */
  const handleColorSelect = (color) => {
    setSelectedColor(color);

    setResumeInfo({
      ...resumeInfo,
      attributes: {
        ...resumeInfo?.attributes,
        themeColor: color,
      },
    });

    const data = {
      data: {
        themeColor: color,
      },
    };

    GlobalApi.UpdateResumeDetails(resumeId, data).then((res) => {
      toast("Theme Color Updated");
    });
  };

  // Colors List
  const colors = [
    "#000000",
    "#2F4F4F",
    "#FFD700",
    "#FFA500",
    "#66CDAA",
    "#FF4500",
    "#FF7F50",
    "#2E8B57",
    "#3CB371",
    "#008B8B",
    "#808000",
    "#20B2AA",
    "#00CED1",
    "#33A1FF",
    "#00BFFF",
    "#1E90FF",
    "#7B68EE",
    "#DAA520",
    "#FF5733",
    "#D2691E",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex gap-2" size="sm">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>

        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => handleColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border ${
               selectedColor == item && "border border-black"
             }`}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
