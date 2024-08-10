import  { useEffect, useState } from 'react';
import './App.css';
import CreateStudent from './Components/CreateStudent';
import StudentList from './Components/StudentList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig';
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  const [students, setStudents] = useState([]);
  const [loader, setLoader] = useState(false);

  const studentsCollection = collection(db, "students");

  const getStudents = async () => {
    setLoader(true); 
    try {
      const studentSnapShot = await getDocs(studentsCollection);
      const studentList = studentSnapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentList);
    } catch (error) {
      console.log(error);
    } 
    setLoader(false);
  };

  
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div
    className="app-container"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
    }}
  >
    <h1
      className="app-title"
      style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: 'green',
        marginBottom: '20px',
      }}
    >
      Student Management System
    </h1>
    <CreateStudent getStudents={getStudents} />
    {loader ? (
      <CircularProgress />
    ) : (
      <StudentList
        students={students}
        setStudents={setStudents}
        style={{ width: '50%', marginTop: '20px' }}
      />
    )}
  </div>
  
  );
}

export default App;