import React from "react";
import {
  Navbar as MTNavbar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

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
          Dawid Gala - Student 6. roku IT, DevOps
        </Typography>


        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden" 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}        
          >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

    </MTNavbar>
  );
}

export default Navbar;
