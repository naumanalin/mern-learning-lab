import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import userModel from '../models/userModel.js'
import appointmentModel from "../models/appointmentSchema.js";


// ------------------------------- Book New Appointment -----------------------------------------------------------------
export const bookNewAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName, lastName, email, phone, cnic, dob, gender, appointment_date,
        department, doctor_firstName, doctor_lastName, hasVisited, address
    } = req.body;

    // Check if all required fields are provided
    if (
        !firstName || !lastName || !email || !phone || !cnic || !dob || !gender ||
        !appointment_date || !department || !doctor_firstName || !doctor_lastName ||
        address === undefined || hasVisited === undefined
    ) {
        return next(new ErrorHandler("Please provide all required fields to book an appointment.", 400));
    }

    // Find the doctor, ensuring exactly 1 match
    const doctor = await userModel.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    });

    if (!doctor || doctor.length === 0) {
        return next(new ErrorHandler("Doctor not found. Please select another doctor or verify the details.", 400));
    }

    if (doctor.length > 1) {
        return next(new ErrorHandler("Doctor name conflict occurred. Please contact support.", 400));
    }

    // Store in the database
    const doctorId = doctor[0]._id;
    const patientId = req.user._id; // Provided by "isPatientAuthenticated" middleware
    const newAppointment = await appointmentModel.create({
        firstName, lastName, email, phone, cnic, dob, gender, appointment_date,
        department, doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited, address, doctorId, patientId
    });

    res.status(201).json({
        success: true,
        message: "Your appointment has been booked successfully!",
        appointment: newAppointment,
    });
});


// ------------------------------- Get All Appointments -----------------------------------------------------------------
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await appointmentModel.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});


// ------------------------------- Update Appointment Status -----------------------------------------------------------------
export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    // Update and find the new appointment status
    const appointment = await appointmentModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Appointment status updated!",
        appointment,
    });
});



// ------------------------------- Delete Appointment -----------------------------------------------------------------
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }

    await appointment.deleteOne();

    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully!",
        appointment,
    });
});
