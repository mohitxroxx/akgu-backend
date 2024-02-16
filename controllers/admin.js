const faculty = require('../models/faculty')
const society = require('../models/society')
const achievement = require('../models/achievement')
const cloudinary = require("../config/cloudinary")
const upload = require("../middlewares/multer")

exports.getFaculty = async (req, res, next) => {
    try {
        const data = await faculty.find({})
        return res.status(200).send(data)
    } catch (err) {
        next(err.message)
    }
}
exports.postFaculty = async (req, res, next) => {
    const data = {
        ...req.body,
        imageUrl: req.body.imageUrl.length === 0 ? undefined : req.body.imageUrl
    }
    try {
        const existing = await faculty.findOne({ imageUrl: req.body.imageUrl })
        if (existing)
            return res.status(403).send("image already exists")
        await new faculty(data).save()
        return res.status(200).send("added successfully")
        // console.log("running fine")

    } catch (err) {
        console.log(err)
        return res.status(403).send("Error occured while adding")
        next(err)
    }
}

exports.updateFaculty = async (req, res, next) => {

    try {
        const existing = await faculty.findOne({ imageUrl: req.body.imageUrl })
        if (!existing)
            return res.status(404).send("This faculty data doesn't exist")

        const data = {
            ...req.body,
            imageUrl: req.body.imageUrl.length === 0 ? undefined : req.body.imageUrl
        }

        Object.keys(data).forEach(key => existing[key] = data[key])
        await existing.save()
        return res.status(200).send("updated successfully")

    } catch (err) {
        next(err)
    }
}

exports.deleteFaculty = async (req, res, next) => {
    const _id = req.params.id
    try {
        const deleted = await faculty.findByIdAndDelete(_id)
        console.log(deleted)
        return res.status(200).send("deleted successfully")
    } catch (err) {
        next(err)
    }
}

exports.getSociety = async (req, res, next) => {
    try {
        const data = await society.find({})
        return res.status(200).send(data)
    } catch (err) {
        next(err.message)
    }
}



exports.postSociety = async (req, res, next) => {

    const data = {
        ...req.body,
        imageUrl1: req.body.imageUrl1.length === 0 ? "" : req.body.imageUrl1,
        imageUrl2: req.body.imageUrl2.length === 0 ? "" : req.body.imageUrl2
    }
    try {
        const existing = await society.findOne({ name: req.body.name })
        if (existing) {
            Object.keys(data).forEach(key => existing[key] = data[key])
            const updated = await existing.save()
            return res.status(403).send("Society already exists")
        }

        const saved = await new society(data).save()
        return res.status(200).send("added successfully")

    } catch (err) {
        next(err)
    }
}

exports.updateSociety = async (req, res, next) => {

    try {
        console.log(req.body.imageUrl2)
        const existing = await society.findOne({ name: req.body.name })
        if (!existing)
            return res.status(404).send("This Society data doesn't exist")
        const data = {
            ...req.body,
            imageUrl1: req.body.imageUrl1.length === 0 ? "" : req.body.imageUrl1,
            imageUrl2: req.body.imageUrl2.length === 0 ? "" : req.body.imageUrl2
        }
        Object.keys(data).forEach(key => existing[key] = data[key])
        const a = await existing.save()
        console.log(a)
        return res.status(200).send("updated successfully")
    } catch (err) {
        next(err)
    }
}

exports.deleteSociety = async (req, res, next) => {
    const id = req.params.id
    const _id = await society.findOne({ _id: id })
    try {
        if (_id) {
            const deleted = await society.findByIdAndDelete(id)
            console.log(deleted)
            return res.status(200).send("deleted successfully")
        }
        return res.status(404).send("Can't find the society details")
    } catch (err) {
        next(err)
    }
}

exports.getAchievement = async (req, res, next) => {
    try {
        const data = await achievement.find({})
        return res.status(200).send(data)
    } catch (err) {
        next(err.message)
    }
}

exports.postAchievement = async (req, res, next) => {
    const data = {
        ...req.body,
        title: req.body.title,
        description: req.body.description,
        imageUrl1: req.body.imageUrl1.length === 0 ? "" : req.body.imageUrl1,
        imageUrl2: req.body.imageUrl2.length === 0 ? "" : req.body.imageUrl2
    }
    try {
        const existing = await achievement.findOne({ title: req.body.title })
        if (existing) {
            Object.keys(data).forEach(key => existing[key] = data[key])
            const updated = await existing.save()
            return res.status(403).send("Achievement already exists")
        }
        const saved = await new achievement(data).save()
        return res.status(200).send("added successfully")
    } catch (err) {
        next(err)
    }
}

exports.updateAchievement = async (req, res, next) => {
    try {
        const existing = await achievement.findOne({ name: req.body.name })
        if (!existing)
            return res.status(404).send("This Achievment data doesn't exist")
        const data = {
            ...req.body,
            name: req.body.name,
            description: req.body.description,
            imageUrl1: req.body.imageUrl1,
            imageUrl2: req.body.imageUrl2
        }
        Object.keys(data).forEach(key => existing[key] = data[key])
        const a = await existing.save()
        console.log(a)
        return res.status(200).send("updated successfully")
    } catch (err) {
        next(err)
    }
}

exports.deleteAchievement = async (req, res, next) => {
    const _id = req.params.id
    try {
        const deleted = await achievement.findByIdAndDelete(_id)
        return res.status(200).send("deleted successfully")
    } catch (err) {
        next(err)
    }
}


exports.upload = function (req, res) {
    upload.single('image')(req, res, function (err) {
        if (err) {
            console.log(err)
            return res.status(200).send("Error occured while uploading")
        }
        cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).send("Error occured with cloudinary")
            }
            return res.status(200).json({ msg: "Uploaded successfully", imageUrl: result.url })
        })
    })
}