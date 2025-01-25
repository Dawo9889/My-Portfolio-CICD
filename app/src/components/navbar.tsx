import React from "react";
import {
  Navbar as MTNavbar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

export function Navbar() {




  return (
    <MTNavbar
      fullWidth
      blurred={false}
      shadow={false}
      color="white"
      className="sticky top-0 z-50 border-0" 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          color="blue-gray"
          className="text-lg font-bold" 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}        
        >
          Dawid Gala - Student 3. roku IT, DevOpsss
        </Typography>


      
      </div>

    </MTNavbar>
  );
}

export default Navbar;
