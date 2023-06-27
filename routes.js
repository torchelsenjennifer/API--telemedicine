import { Router } from "express"
import { administratorAlterPassword, administratorCreate, administratorIndex } from "./controllers/administratorController.js"
import { patientAlterPassword, patientCreate, patientIndex } from "./controllers/patientController.js"
import { specialistCreate, specialistIndex } from "./controllers/specialistController.js"
import { appointmentAlter, appointmentCreate, appointmentDestroy, appointmentIndex, appointmentPesq } from "./controllers/appointmentController.js"
import { loginAdmin, loginPatient } from "./controllers/loginController.js"
import { verificaLoginPatient } from "./middlewares/verificaLoginPatient.js"
import { verificaLoginAdm } from "./middlewares/verificaLoginAdm.js"


const router = Router()

router.get('/administrator', verificaLoginAdm, administratorIndex)
      .post('/administrator', verificaLoginAdm, administratorCreate)
	  .put('/administrator/alter', administratorAlterPassword  )

router.get('/patient', verificaLoginAdm, patientIndex)
      .post('/patient', verificaLoginPatient, patientCreate)
	  .put('/patient/alter', patientAlterPassword )

router.get('/specialist', verificaLoginPatient, verificaLoginAdm, specialistIndex)
      .post('/specialist', verificaLoginAdm , specialistCreate)

router.get('/appointment', verificaLoginPatient, appointmentIndex)
	  .post('/appointment', verificaLoginPatient, appointmentCreate)
	  .delete('/appointment/:id', verificaLoginPatient, appointmentDestroy)
	  .put('/appointment/alter/:id', verificaLoginPatient, appointmentAlter)
	  .get('/appointment/pesq/:appointment_Date', appointmentPesq)

router.get('/loginUsuario/patient', loginPatient)

router.get('/loginUsuario/adm', loginAdmin)



export default router