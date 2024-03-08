import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import NoteContext from '../context/notes/noteContext';




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Showtask = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    // Function to determine background color based on priority
    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'rgba(255, 205, 210, 0.5)'; // Red color with opacity for high priority
            case 'moderate':
                return 'rgba(255, 249, 196, 0.5)'; // Yellow color with opacity for moderate priority
            case 'low':
                return 'rgba(200, 230, 201, 0.5)'; // Green color with opacity for low priority
            default:
                return 'rgba(255, 255, 255, 0.5)'; // Default white color with opacity
        }
    };

    const priorityColor = getPriorityColor(note.priority);
    // Function to format date string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return ( 
        <div className=" mb-4 bg-[#f5ecfc] " >
            <div className='' >
                <Card key={note._id} variant="outlined"  className='5  flex  bg-opacity-75  bg-blur-md border-2 border-stone-50 backdrop-filter backdrop-blur-md backdrop-saturate-100  shadow-2xl' style={{ backgroundColor: priorityColor }}>
                    <Box  className='mr-auto  ml-10'  sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography gutterBottom variant="h5" component="div">
                                {note.title} 
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2">
                            {note.description}
                        </Typography>
                    </Box >
                    <Divider />
                    <Box className='flex ' alignItems='center' sx={{ p: 2 }}>
                        <Typography color="text.secondary" variant="body2" >
                            Due date: {formatDate(note.date)}
                        </Typography>
                        <Typography gutterBottom variant="body2" className='px-10'>
                            Edit or Delete your Task
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center" >
                            {/* Checkbox */}
                            
                            <Checkbox {...label} onClick={() => deleteNote(note._id)} />

                            {/* Edit icon */}
                            <EditIcon onClick={() => updateNote(note)} />
                        </Stack>
                    </Box>
                </Card>
            </div>
        </div>
    );
};

export default Showtask;
