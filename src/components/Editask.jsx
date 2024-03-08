import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import Showtask from './Showtask';
import Header from './Header';
import Footer from './Footer';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Editask(props) {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  let navigate = useNavigate();


  // useEffect(() => {
  //   // Fetch notes when the component mounts or updates
  //   getNotes();
  // }, []); // Empty dependency array to ensure effect runs only once after initial render


  useEffect(() => {
if(localStorage.getItem('token')){
  getNotes();
}
else{
  navigate("/login")
}
    // eslint-disable-next-line
  }, [])


  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" , epriority: "", edate:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, epriority: currentNote.priority, edate: currentNote.date })
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag, note.epriority, note.edate);
    toast.success("Task edited Successfully! ");
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value })
  }


  return (
    <>
<Header/>

<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-[#FFFBF5]">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-[#674188] font-bold" id="exampleModalLabel">Edit Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-5">
                  <label htmlFor="title" className="form-label text-[#674188] font-semibold">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label text-[#674188] font-semibold">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label text-[#674188] font-semibold">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label text-[#674188] font-semibold">Priority</label>
                  <input type="text" className="form-control" id="epriority" name="epriority" value={note.epriority} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label text-[#674188] font-semibold">Date</label>
                  <input type="date" className="form-control" id="edate" name="edate" value={note.edate} onChange={onChange} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn bg-purple-200 text-black" data-bs-dismiss="modal">Close</button>
              <button disable={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn bg-[#674188] text-[#f1daff]">Update note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="  flex flex-col ">
          {notes.map((note) => {
            return <Showtask key={note._id} updateNote={updateNote}  note={note} />;
          })}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Editask;
