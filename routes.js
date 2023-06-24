import { Router } from "express"
import { administratorCreate, administratorIndex } from "./controllers/administratorController.js"
import { patientCreate, patientIndex } from "./controllers/patientController.js"
import { specialistCreate, specialistIndex } from "./controllers/specialistController.js"



const router = Router()

router.get('/administrator', administratorIndex)
      .post('/administrator', administratorCreate)

router.get('/patient', patientIndex)
      .post('/patient', patientCreate)

router.get('/specialist', specialistIndex)
      .post('/specialist', specialistCreate)



export default router