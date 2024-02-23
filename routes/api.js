const router = require('express').Router()
const adminController = require('../controllers/admin')
const authorization = require('../middlewares/authorization')

router.get('/faculty', adminController.getFaculty)

router.post('/faculty', authorization('admin'), adminController.postFaculty)

router.patch('/faculty', authorization('admin'), adminController.updateFaculty)

router.delete('/faculty/:id', authorization('admin'), adminController.deleteFaculty)

router.get('/society', adminController.getSociety)

router.post('/society', authorization('admin'), adminController.postSociety)

router.patch('/society', authorization('admin'), adminController.updateSociety)

router.delete('/society/:id', authorization('admin'), adminController.deleteSociety)

router.get('/achievement', adminController.getAchievement)

router.post('/achievement', authorization('admin'), adminController.postAchievement)

router.patch('/achievement', authorization('admin'), adminController.updateAchievement)

router.delete('/achievement/:id', authorization('admin'), adminController.deleteAchievement)

router.post('/upload', authorization('admin'), adminController.upload)
 
module.exports = router