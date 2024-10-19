import {catchAsyncErrors} from '../middleware/catchAsyncErrors.js'
import ErrorHandler from '../middleware/errorMiddleware.js';
import userModel from '../models/userModel.js'
import { generateTokenAndSendCookie } from '../utils/generateTokenAndSendCookie.js';
import cloudinary from 'cloudinary'


// controllers: Patient Registration, login, addNewAdmin, addNewDoctor, getUserDetails, logoutAdmin, logoutPatient

// -------------------------- Patient Registration ------------------------------------------------------------------------
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, cnic, dob, gender } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !phone || !password || !cnic || !dob || !gender) {
        return next(new ErrorHandler("Please Provide All Required Fields", 400));
    }

    // Check if the email is already registered
    const isAlreadyRegistered = await userModel.findOne({ email });
    if (isAlreadyRegistered) {
        return next(new ErrorHandler("Email Already Registered, You Can Login", 400));
    }

    // Create a new user
    const user = await userModel.create({
        firstName, lastName, email, phone, password, cnic, dob, gender, role: "Patient"
    });
    generateTokenAndSendCookie(user, `${firstName} is successfully registered.`, 201, res )

});


// -------------------------- login ----------------------------------------------------------------------------------------
export const login = catchAsyncErrors( async (req, res, next)=>{
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All Fields To Login", 400))
    }
    if(password != confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password Did Not Match", 400))
    }
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Email Not Found", 400))
    }
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        return next(new ErrorHandler("Password Did Not Match", 400))
    }
    // user jo role bajraha aur jo role data base ma ha, agar match na hu tu...
    if(role != user.role){
        return next(new ErrorHandler(`User Not Found With '${role}' Role.`, 400))
    }
    generateTokenAndSendCookie(user, "user login successfully", 200, res)
})

// -------------------------- addNewAdmin ----------------------------------------------------------------------------------
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, cnic, dob, gender, password } = req.body;
    if ( !firstName || !lastName || !email || !phone || !cnic || !dob ||!gender ||!password) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await userModel.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler(`This email '${email}' is already taken As ${isRegistered.role}`, 400));
    }
  
    const admin = await userModel.create({
      firstName,
      lastName,
      email,
      phone,
      cnic,
      dob,
      gender,
      password,
      role: "Admin",
    });
    res.status(200).json({
      success: true,
      message: "New Admin Registered Successfully",
      admin,
    });
  });
// -------------------------- addNewDoctor ---------------------------------------------------------------------------------
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if(!req.files || Object.keys(req.files).length === 0){
    return next(new ErrorHandler("Doctor Avatar Required", 400))
  }
  const { docAvatar } = req.files;
  console.log(req.files)
  const allowedExtensions = ["image/png", "image/jpeg", "image/webp"];
  if(!allowedExtensions.includes(docAvatar.mimetype)){
    return next(new ErrorHandler("Only 'png', 'jpeg' and 'webp' are allowed Extensions.", 400))
  }

  const {firstName, lastName, email, phone, cnic, dob, gender, password, doctorDepartment} = req.body;
  if (!firstName || !lastName || !email || !phone || !cnic || !dob ||!gender || !password || !doctorDepartment){
    return next(new ErrorHandler("All Fields Are Required To Registor New Docotor", 400))
  }

  const isAlreadyRegistor = await userModel.findOne({email})
  if(isAlreadyRegistor){
    return next(new ErrorHandler("Dotocr Already Registor With This Email", 400))
  }


  // post image on cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  )
  if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unkown Cloudinary Error")
  }

  // Create New Doctor
  const newDoctor = await userModel.create({
    firstName, lastName, email, phone, cnic, dob, gender, password, doctorDepartment,
    role:"Doctor", docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    }
  })

  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    newDoctor,
  });

})

// -------------------------- getAllDoctors --------------------------------------------------------------------------------
export const getAllDoctors = catchAsyncErrors( async(req, res, next)=>{
    const doctors = await userModel.find({ role: "Doctor" });
    res.status(200).json({
        success:true,
        doctors
    })
})

// -------------------------- getUserDetails ==> to get Logged user details --------------------------------------------------------------------------------
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });

// -------------------------- logoutAdmin --------------------------------------------------------------------------------
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});

// -------------------------- logoutPatient --------------------------------------------------------------------------------
export const logoutPatient = catchAsyncErrors( async (req, res, next)=>{
  res.status(201).cookie("patienttoken", "",{
    httpOnly:true,
    expires: new Date(Date.now())
  }).json({
    success:true,
    message:"Patient Logout Successfully."
  })
})

// --------------------------  --------------------------------------------------------------------------------


