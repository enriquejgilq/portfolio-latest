import React, { useState } from "react";
import { Grid } from "lucide-react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Button } from "@mui/material";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export const Profile = ({ img = "" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className="flex flex-row items-center space-x-2 cursor-pointer">
        <button className="flex items-center justify-center p-2 w-10 h-10 hover:bg-gray-100 rounded-full">
          <Grid className="w-5 h-5 text-gray-600" />
        </button>
        <img
          src={img}
          alt="Profile"
          className="w-10 h-10 rounded-full"
          onClick={handleClick}
        />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 4,
          },
        }}
      >
        <div className="flex flex-col w-72 h-[500px]">
          <div className="flex flex-row bg-gray-300 h-12 items-center justify-between px-2">
            <div className="flex-1 flex justify-center">
              <Typography> Hola!</Typography>
            </div>
            <div className="flex justify-end">
              <CloseSharpIcon
                className="cursor-pointer text-gray-600"
                onClick={handleClose}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-2">
            <img
              src={img}
              alt="Profile"
              className="w-16 h-16 rounded-full cursor-pointer"
            />
            <Button
              variant="outlined"
              size="small"
              color="black"
              sx={{ borderRadius: "25px", color: "black" }}
            >
              Contacto
            </Button>
            <div className="flex w-full justify-center gap-4">
              <a
                href="https://x.com/enriquegilq"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <FaXTwitter size="40px" />
              </a>
              <a
                href="https://www.linkedin.com/in/enriquegilq/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <FaLinkedinIn size="40px" />
              </a>
              <a
                href="https://github.com/enriquejgilq"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <FaGithub size="40px" />
              </a>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};
