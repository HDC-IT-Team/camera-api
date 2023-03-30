import * as express from 'express';
import { CameraController } from '../controller/CameraController';
import { AuthGuard } from '../guard/AuthGuard';
const router = express.Router();

router.get('/photo', CameraController.getPhotoBase64);
router.post('/create', AuthGuard.authenticated, CameraController.postCamera);
router.put('/update/:cameraId', AuthGuard.authenticated, CameraController.putCamera);
router.delete('/delete/:cameraId', AuthGuard.authenticated, CameraController.deleteCamera);

export default router;