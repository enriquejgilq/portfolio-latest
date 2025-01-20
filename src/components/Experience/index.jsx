import React, { useState, useEffect } from 'react'

import Timeline from '@mui/lab/Timeline';
import TimelineItem,  { timelineItemClasses }  from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography } from '@mui/material';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { format } from 'date-fns';
import Logo from '../../components/Logo'

function Experience() {
    const [loading, setLoading] = useState(false);
    const [experience, setExperience] = useState([])

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const host = import.meta.env.VITE_HOST;
 
    async function fetchSearchAllExperience() {
        setLoading(true);
        try {
            const endpoint = "getAllExperience";

            const response = await fetch(
                `${host}/api/${endpoint}`
            );

            if (!response.ok) {
                throw new Error("Error al realizar la búsqueda");
            }
            const data = await response.json();
            setExperience(data.results)
            setLoading(false);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setLoading(false);
            return null;
        }
    }


    useEffect(() => {
        fetchSearchAllExperience()
    }, [])

    return (
        <div className="flex justify-start items-start">
            <Logo open={loading} />
            {experience.length === 0 ? (
    <Typography> Sin Resultados</Typography>
) : (
    <Timeline sx={
        isMobile
          ? {
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }
          : {}
      }
      position={isMobile ? "left" : "alternate"}>
        {experience.map((item, index) => (
            <TimelineItem
                key={item._id}
                className="hover:scale-110 active:scale-110 focus-within:scale-110 transition-transform duration-300"
            >
                <TimelineSeparator>
                    <TimelineDot />
                    {index < experience.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent className="relative">
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                            fontWeight: 'bold',
                            zIndex: 10,  
                        }}
                    >
                        {item.company}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            fontWeight: 'bold',
                        }}
                    >
                        {item.position} - {item.typePosition}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                            color: 'text.secondary',
                        }}
                    >
                        {format(new Date(item.startDate), 'MMM yyyy')}
                        - {item.endDate ? format(new Date(item.endDate), 'MMM, yyyy') : 'Presente'}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                            color: 'text.secondary',
                            marginTop: '0.5rem',
                        }}
                    >
                        <ul>
                            {item?.description?.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                            color: 'text.secondary',
                        }}
                    >
                        <strong> Ubicación:</strong> {item.location}
                    </Typography>
                </TimelineContent>
            </TimelineItem>
        ))}
    </Timeline>
)}

        </div>
    )
}

export default Experience