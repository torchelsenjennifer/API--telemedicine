import { Router } from "express"
import { administratorCreate, administratorIndex } from "./controllers/administratorController.js"
import { patientCreate, patientIndex } from "./controllers/patientController.js"
import { specialistCreate, specialistIndex } from "./controllers/specialistController.js"
import { appointmentCreate, appointmentDestroy, appointmentIndex } from "./controllers/appointmentController.js"
import { loginPatient } from "./controllers/loginController.js"
import { verificaLoginPatient } from "./middlewares/verificaLoginPatient.js"
import { verificaLoginAdm } from "./middlewares/verificaLoginAdm.js"


const router = Router()

router.get('/administrator', verificaLoginAdm, administratorIndex)
      .post('/administrator', verificaLoginAdm, administratorCreate)

router.get('/patient', verificaLoginAdm, patientIndex)
      .post('/patient', verificaLoginPatient, patientCreate)

router.get('/specialist', verificaLoginPatient, verificaLoginAdm, specialistIndex)
      .post('/specialist', verificaLoginAdm , specialistCreate)

router.get('/appointment', verificaLoginPatient, appointmentIndex)
	  .post('/appointment', verificaLoginPatient, appointmentCreate)
	  .delete('/appointment/:id', verificaLoginPatient , appointmentDestroy)

router.get('/loginUsuario', loginPatient)

export default router