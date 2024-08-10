import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import UpdateStudentDialog from './UpdateStudentDialog';
import { useState } from 'react';

export default function StudentTable({ students, setStudents }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  function handleUpdateStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    setCurrentStudent(student);
    setEditDialogOpen(true);
  }

  async function handleSaveStudent() {
    try {
      const studentDoc = doc(db, "students", currentStudent.id);
      await updateDoc(studentDoc, {
        name: currentStudent.name,
        age: currentStudent.age,
        rollno: currentStudent.rollno
      });

      setStudents((students) =>
        students.map((student) =>
          student.id === currentStudent.id ? currentStudent : student
        )
      );
      handleDialogClose();
    } catch (error) {
      console.error("Error updating student: ", error);
    }
  }

  async function handleDeleteStudent(studentId) {
    try {
      const studentDoc = doc(db, "students", studentId);
      await deleteDoc(studentDoc);
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  }

  function handleDialogClose() {
    setEditDialogOpen(false);
    setCurrentStudent(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCurrentStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Student Roll No</TableCell>
              <TableCell align="center">Student Name</TableCell>
              <TableCell align="center">Student Age</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{student.rollno}</TableCell>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.age}</TableCell>
                <TableCell align="center">
                  <EditIcon onClick={() => handleUpdateStudent(student.id)} style={{ cursor: "pointer", color: "#007bff", marginRight: 10 }} />
                  <DeleteIcon onClick={() => handleDeleteStudent(student.id)} style={{ cursor: "pointer", color: "crimson", marginRight: 10 }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateStudentDialog editDialogOpen={editDialogOpen} currentStudent={currentStudent} handleDialogClose={handleDialogClose} handleChange={handleChange} handleSaveStudent={handleSaveStudent} />
    </>
  );
}