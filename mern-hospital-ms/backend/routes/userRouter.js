import express from 'express'
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from '../controllers/user-controller.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res)=>{res.json({success:true, message:"welcome to all user routes base end point"})})

router.post('/patient/registration', patientRegister)
router.post('/login', login)
router.post('/admin/newadmin',isAdminAuthenticated, addNewAdmin)

router.post('/doctor/addNew', isAdminAuthenticated, addNewDoctor)
router.get('/doctors', getAllDoctors)

router.get('/loggedAdmin/details', isAdminAuthenticated, getUserDetails)
router.get('/loggedPatient/details', isPatientAuthenticated, getUserDetails)

router.get('/patient/logout', isPatientAuthenticated, logoutPatient)
router.get('/admin/logout', isAdminAuthenticated, logoutAdmin)

export default router;