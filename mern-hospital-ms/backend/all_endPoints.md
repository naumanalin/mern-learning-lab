## All End Points are:


# Message 

POST: http://localhost:8000/api/message/send  --> Public ✅️
GET: http://localhost:8000/api/message/allMessages   --> Admin Protected 


# FrontEnd

patient registration: POST: http://localhost:8000/api/user/patient/registration --> Public ✅️
Get All Doctors: GET: http://localhost:8000/api/user/doctors --> Public ✅️

# Appointment
test route: GET: http://localhost:8000/api/appointment ✅️
Add New Appointment: POST: http://localhost:8000/api/appointment/addNewAppointment --> Patient Login Protected ✅️
Get All Appointment: GET: http://localhost:8000/api/appointment/getall/appointments --> Admin Protected
Update Appointment: PUT: http://localhost:8000/api/appointment/update/:id --> Admin Protected
Delete Appointment: DELETE: http://localhost:8000/api/appointment/delete/:id --> Admin Protected

# Dashboard
Add new Admin:  POST: http://localhost:8000/api/user/admin/newadmin  --> Admin Protected Route
Add new Doctor: POST: http://localhost:8000/api/user/doctor/addNew   --> Admin Protected Route


# Login, 
POST:  http://localhost:8000/api/user/login  --> ✅️ Public for ALL (patient, admin, doctor) note: send role from login form

# Logged User Details
GET: http://localhost:8000/api/user/loggedAdmin/details  --> Admin Protected
GET: http://localhost:8000/api/user/loggedPatient/details --> Patient Protected ✅️

# Logout
GET: http://localhost:8000/api/user/patient/logout --> Patient Protected ✅️
GET: http://localhost:8000/api/user/admin/logout --> Admin Protected




###### Faviourate Features In This Project / New Things to learn
# data base Schema's with false messages ---> concept: 100% done
# catchAsyncError ---> concept: done
# errorMiddleware ---> concept:
# generateTokenAndSendCookie ---> concept: 100% done




# dotenv
PORT=8000

MONGOOSE_URI= mongodb://127.0.0.1:27017/mern-hospital-ms 

FRONTEND_URL = http://localhost:5173

DASHBOARD_URL = http://localhost:5174

JWT_SECRET_KEY = KADSFJKADSJUIFJ89WEVF3420934VDF

JWT_EXPIRES = 7d

COOKIE_EXPIRE = 7

CLOUDINARY_CLOUD_NAME = 

CLOUDINARY_API_SECRET = 

CLOUDINARY_API_KEY = 