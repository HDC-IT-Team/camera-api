import * as express from 'express';
import { LocationController } from '../controller/LocationController';
import { AuthGuard } from '../guard/AuthGuard';
const router = express.Router();

router.get('/list', LocationController.getLocations);
router.post('/create', AuthGuard.authenticated, LocationController.postLocation);
router.put('/update/:locationId', AuthGuard.authenticated, LocationController.putLocation);
router.delete('/delete/:locationId', AuthGuard.authenticated, LocationController.deleteLocation);

export default router;