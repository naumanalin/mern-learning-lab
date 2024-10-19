import express from 'express'
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js';
import { bookNewAppointment, deleteAppointment, getAllAppointments, updateAppointmentStatus } from '../controllers/appointment-controller.js'
const router = express.Router();

router.get('/', (req, res)=>{res.status(200).json({success:true, message:"appoinment test router run successfully"})})

router.post('/addNewAppointment', isPatientAuthenticated, bookNewAppointment)
router.get('/getall/appointments', isAdminAuthenticated, getAllAppointments)
router.put('/update/:id', isAdminAuthenticated, updateAppointmentStatus)
router.delete('/delete/:id', isAdminAuthenticated, deleteAppointment)


export default router;