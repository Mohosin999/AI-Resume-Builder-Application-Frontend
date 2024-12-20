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

  const colors = [
    "#000000",
    "#2F4F4F",
    "#4B0082",
    "#5F9EA0",
    "#B8860B", // dark tones
    "#6A5ACD",
    "#8B008B",
    "#556B2F",
    "#2E8B57",
    "#FF6347", // rich colors
    "#FFD700",
    "#FFA500",
    "#66CDAA",
    "#FF4500",
    "#FF7F50", // vibrant tones
    "#2E8B57",
    "#3CB371",
    "#008B8B",
    "#808000",
    "#20B2AA", // earthy tones
    "#00CED1",
    "#4682B4",
    "#1E90FF",
    "#00BFFF",
    "#1E90FF", // blues
    "#7B68EE",
    "#DAA520",
    "#FF5733",
    "#D2691E",
    "#B22222", // warm tones
    "#F08080",
    "#E9967A",
    "#FF69B4",
    "#C71585",
    "#DB7093", // pinks
    "#FFB6C1",
    "#FF1493",
    "#BA55D3",
    "#9400D3",
    "#9370DB", // purples
    "#8A2BE2",
    "#D8BFD8",
    "#FFFAF0",
    "#F5DEB3",
    "#DCDCDC", // neutrals
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex gap-2 bg-secondary border-secondary" size="sm">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border-primary bg-card shadow-lg">
        <h2 className="mb-2 text-sm font-bold text-primary">
          Select Theme Color
        </h2>

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
