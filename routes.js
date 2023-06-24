import { Router } from "express"
import { administratorCreate, administratorIndex } from "./controllers/administratorController.js"
import { patientCreate, patientIndex } from "./controllers/patientController.js"
import { specialistCreate, specialistIndex } from "./controllers/specialistController.js"
import { appointmentCreate, appointmentDestroy, appointmentIndex } from "./controllers/appointmentController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"
import { loginPatient } from "./controllers/loginController.js"

const router = Router()

router.get('/administrator', administratorIndex)
      .post('/administrator', administratorCreate)

router.get('/patient', patientIndex)
      .post('/patient', patientCreate)

router.get('/specialist', specialistIndex)
      .post('/specialist', specialistCreate)

router.get('/appointment', appointmentIndex)
	  .post('/appointment', appointmentCreate)
	  .delete('/appointment/:id', verificaLogin, appointmentDestroy)

router.get('/loginUsuario', loginPatient)

export default router