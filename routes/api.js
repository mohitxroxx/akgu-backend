const router = require('express').Router()
const adminController = require('../controllers/admin')
const authorization = require('../middlewares/authorization')

router.get('/faculty', authorization('member'), adminController.getFaculties)

router.get('/faculty/:id', authorization('admin'), adminController.getFaculty)

router.post('/faculty', authorization('admin'), adminController.postFaculty)

router.patch('/faculty', authorization('admin'), adminController.updateFaculty)

router.delete('/faculty/:id', authorization('admin'), adminController.deleteFaculty)

router.get('/society', authorization('member'), adminController.getSocieties)

router.get('/society/:id', authorization('admin'), adminController.getSociety)

router.post('/society', authorization('admin'), adminController.postSociety)

router.patch('/society', authorization('admin'), adminController.updateSociety)

router.delete('/society/:id', authorization('admin'), adminController.deleteSociety)

router.get('/achievements', authorization('member'), adminController.getAchievements)

router.get('/achievement/:id', authorization('admin'), adminController.getAchievement)

router.post('/achievement', authorization('admin'), adminController.postAchievement)

router.patch('/achievement', authorization('admin'), adminController.updateAchievement)

router.delete('/achievement/:id', authorization('admin'), adminController.deleteAchievement)

router.post('/upload', authorization('admin'), adminController.upload)
 
module.exports = router