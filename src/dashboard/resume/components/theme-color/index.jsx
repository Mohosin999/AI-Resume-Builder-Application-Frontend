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
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
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
