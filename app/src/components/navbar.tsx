import React from "react";
import {
  Navbar as MTNavbar,
  IconButton,
  Typography,
} from "@material-tailwind/react";

const NavbarAny: any = MTNavbar;
const IconButtonAny: any = IconButton;
const TypographyAny: any = Typography;
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

export function Navbar() {




  return (
    <NavbarAny
      fullWidth
      blurred={false}
      shadow={false}
      color="white"
      className="sticky top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        <TypographyAny color="blue-gray" className="text-lg font-bold">
          Dawid Gala - Student 4. roku IT, DevOps
        </TypographyAny>

      </div>

  </NavbarAny>
  );
}

export default Navbar;
