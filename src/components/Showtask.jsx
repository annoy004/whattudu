import React, { useState, useEffect } from 'react';
import AiImageGenerator from './AiImageGenerator';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Showtask = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [notes, setNotes] = useState([]);
    const host = "http://localhost:8000"; // Define the host URL of your backend API

    useEffect(() => {
        const getNotes = async () => {
            try {
                //Api call
                const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZDhlNWI5N2ZjMGE4YzA1YzE2MTgxIn0sImlhdCI6MTcwOTAxOTI5M30.TAoTtoKsVGDbhSd6lQ1_SCxLjJKqIR721ZaoJJDtpOU"
                    },
                });
                const json = await response.json();
                console.log(json);
                setNotes(json);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        getNotes();
    }, []);

    const handleOptionClick = async (priority, id, date) => {
        setSelectedOption(priority);
        setAnchorEl(null);
 
        // Delete the note associated with the checkbox
        await deleteNote(id);

       
    };

    const deleteNote = async (id) => {
        try {
            // Api call to delete note
            await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE", 
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkZDhlNWI5N2ZjMGE4YzA1YzE2MTgxIn0sImlhdCI6MTcwOTAxOTI5M30.TAoTtoKsVGDbhSd6lQ1_SCxLjJKqIR721ZaoJJDtpOU"
                }
            });
            // Update the notes state after deletion
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div className='flex flex-wrap'>
            {Array.isArray(notes) && notes.map((note) => (
                <Card key={note._id} variant="outlined" sx={{ maxWidth: 360, backgroundColor: getCardColor(note.priority) }} className='ml-20 mt-12 mr-5'>
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography gutterBottom variant="h5" component="div">
                                {note.title} <AiImageGenerator prompt={note.title} />
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2">
                            {note.description}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                    <Typography color="text.secondary" variant="body2">
                            {note.date}
                        </Typography>
                        <Typography gutterBottom variant="body2">
                            Select type
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            {/* Checkbox */}
                            <Checkbox {...label} onClick={() => handleOptionClick(note.priority, note._id)} />

                            {/* Edit icon */}
                            <EditIcon />
                        </Stack>
                    </Box>
                </Card>
            ))}
        </div>
    );
};

const getCardColor = (priority) => {
    switch (priority) {
        case 'High':
            return '#ffcccc'; // Red color
        case 'Moderate':
            return '#ffffcc'; // Yellow color
        case 'Low':
            return '#ccffcc'; // Green color
        default:
            return '#ffffff'; // Default color
    }
};

export default Showtask;
