import { addDoc, collection } from 'firebase/firestore';
import  { useState } from 'react';
import { db } from '../FirebaseConfig';

// or
import { CircularProgress } from '@mui/material';


function CreateStudent({ getStudents }) {
  const [rollno, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreatingStudent(true);
      await addDoc(collection(db, "students"), {
        rollno: Number(rollno),
        name: name,
        age: Number(age)
      });
      setRollNo("");
      setName("");
      setAge("");
      await getStudents();
    } catch (error) {
      console.log("error creating user", error);
    }
    setIsCreatingStudent(false);
  };

  return (
    <form 
    onSubmit={handleFormSubmit} 
    className='form' 
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'gray',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px'
    }}
  >
    <input 
      type="text" 
      placeholder='Enter your roll no' 
      required 
      value={rollno} 
      onChange={(e) => setRollNo(e.target.value)} 
      style={{
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        transition: 'border-color 0.3s ease-in-out'
      }}
    />
    <input 
      type="text" 
      placeholder='Enter your name' 
      required 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      style={{
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        transition: 'border-color 0.3s ease-in-out'
      }}
    />
    <input 
      type="number" 
      placeholder='Enter your age' 
      value={age} 
      onChange={(e) => setAge(e.target.value)} 
      style={{
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        transition: 'border-color 0.3s ease-in-out'
      }}
    />
    <button 
      type='submit' 
      style={{
        padding: '0.75rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'pink',
        color: 'black',
        fontSize: '1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {isCreatingStudent ? <CircularProgress size={24} color="inherit" /> : "Create Student"}
    </button>
  </form>
  
  );
}


export default CreateStudent;