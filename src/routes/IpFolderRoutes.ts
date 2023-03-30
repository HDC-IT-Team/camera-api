import * as express from 'express';
import { IpFolderController } from '../controller/IpFolderController';
import { AuthGuard } from '../guard/AuthGuard';
const router = express.Router();

router.post('/create', AuthGuard.authenticated, IpFolderController.postIpFolder);
router.put('/update/:ipFolderId', AuthGuard.authenticated, IpFolderController.putIpFolder);
router.delete('/delete/:ipFolderId', AuthGuard.authenticated, IpFolderController.deleteIpFolder);

export default router;