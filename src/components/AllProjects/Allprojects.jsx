import React, { useState } from "react";
import { Drawer, Card, Typography, Button, useMediaQuery, useTheme, IconButton } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { Close } from '@mui/icons-material';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";


const Allprojects = ({ data = [] }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (item, index) => {
    setDrawerContent(item);
    setCurrentIndex(index);
    setOpen(true);
  }

  const handleCloseDrawer = () => {
    setOpen(false);
    setCurrentIndex(0);
  };

  const goToPreviousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setDrawerContent(data[currentIndex - 1]);
    }
  };

  const goToNextItem = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setDrawerContent(data[currentIndex + 1]);
    }
  };

  const onNavigate = (id) => {
    navigate(`/details?id=${id}`);
  }

  return (
    <div className="flex mt-1 flex-col">
      <div className="flex flex-row gap-2">
        {data.map((item, index) => (
          <div
            className="h-11 flex flex-row w-36 border border-gray-400 rounded-lg"
            key={index}
          >
            <div className="flex justify-center items-center">
              <div style={{ width: 70, height: 40 }} className="flex justify-center items-center">
                <img
                  alt='img'
                  height={'100%'}
                  width={'100%'}
                  className="rounded-l-lg"
                  src={item.images[0]}
                />
              </div>

            </div>
            <div className="flex items-center justify-center w-3/5 ">
              <Typography sx={{ fontWeight: '700' }} fontSize={12}>{item?.technology[0]}</Typography>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-1">
        <Grid
          sx={{ width: '100%' }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((item, index) => {
             return (
              <Grid
                key={index}
                item
                xs={4} sm={4} md={4}
                className="flex justify-center flex-col items-center"
              >
                <Card onClick={() => handleClick(item, index)}
                  className="p-5 transition-all duration-300 
                       h-[200px] w-full md:min-w-[400px] md:w-[200px] 
                        md:hover:scale-110 md:hover:shadow-2xl cursor-pointer"
                >
                  <img className="w-full h-full object-cover" src={item.images[0]} alt="img" />
                </Card>
                <div className="flex flex-col items-start whitespace-nowrap overflow-hidden text-ellipsis mt-2 w-full">
                  <Typography onClick={() => onNavigate(item._id)} fontSize={12}
                    className="text-center cursor-pointer hover:underline"
                  >{item.description}</Typography>
                  <Typography className="text-center">{item.name}</Typography>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>


      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={open}
        onClose={handleCloseDrawer}
        sx={{
          width: isMobile ? '100%' : 420,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : 420,
            boxSizing: 'border-box',
            height: isMobile ? 'auto' : '100%',
            overflow: 'auto',
          },
        }}
      >

        <div style={{ padding: '20px', width: '100%' }}>

          {!isMobile && (
            <div className="flex justify-end mb-2">
              <IconButton
                className="focus:outline-none focus:ring-0"
                disableRipple
                onClick={goToPreviousItem}
                disabled={currentIndex === 0}>
                <ArrowBackIosIcon fontSize="medium" />
              </IconButton>
              <IconButton
                className="focus:outline-none focus:ring-0"
                disableRipple
                onClick={goToNextItem}
                disabled={currentIndex === data.length - 1}>
                <NavigateNextSharpIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={handleCloseDrawer}>
                <Close />
              </IconButton>
            </div>
          )}
          <Typography variant="h6">Detalles del Elemento</Typography>
          <img src={drawerContent?.images[0]} alt="img" style={{ width: '100%' }} />
          <Typography variant="body1">{drawerContent?.description}</Typography>
          <Button onClick={handleCloseDrawer} sx={{ marginTop: 2 }}>Cerrar</Button>
        </div>
      </Drawer>

    </div>
  );
};

export default Allprojects;
