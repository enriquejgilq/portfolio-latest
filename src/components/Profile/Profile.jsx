import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Button } from "@mui/material";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Profile = ({ imgLogo="" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const socialMedia = [{
    name: 'twitter',
    link: 'https://x.com/enriquegilq',
    icon: FaXTwitter,
    size: '40px',
    color: 'black'
  }, {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/enriquegilq/',
    icon: FaLinkedinIn,
    size: '40px',
    color: 'black'
  }, {
    name: 'github',
    link: 'https://github.com/enriquejgilq',
    icon: FaGithub,
    size: '40px',
    color: 'black'
  }]

  return (
    <>
      <div className="flex flex-row items-center space-x-2 cursor-pointer">
        <button className="flex items-center justify-center p-0 w-8 h-8 bg-gray-100 rounded-full">
        </button>
        <img
          src={imgLogo}
          alt="Profile"
          className="w-[100%] h-10"
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
        <div className="flex flex-col w-72 h-[250px]">
          <div className="flex flex-row bg-gray-300 h-12 items-center justify-between px-2">
            <div className="flex-1 flex justify-center">
              <Typography sx={{ fontFamily: '"Open Sans", Arial, sans-serif' }}>¡Hola,Mucho gusto! </Typography>
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
              src={imgLogo}
              alt="Profile"
              className="w-17 h-16   cursor-pointer"
            />
            <Button
              variant="outlined"
              size="medium"
              disableRipple
              sx={{
                borderRadius: "25px",
                fontFamily: '"Open Sans", Arial, sans-serif',
                color: "black",
                borderColor: "black",
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.6)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.9)",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Contacto
            </Button>
            <div className="flex w-full justify-center gap-4">
              {socialMedia.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:scale-150 hover:shadow-xl transition-all duration-300">
                    <IconComponent size={item.size} color={item.color} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};
