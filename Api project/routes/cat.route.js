import { Router } from "express";
import { store, index} from '../controllers/cat.controller.js'
import { checkUser, roleUser } from '../middlewares/verify.js'


const router = Router()
router
.route('/')
.post(checkUser, roleUser(['Admin','Manager','Librarian']),store)
.get(checkUser, roleUser(['Admin','Manager','Librarian','Member']),index)

export default router