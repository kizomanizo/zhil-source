const Level = require('../models').Level
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')

async function list() {
    const allLevels = await Level.findAll({})
        if (!allLevels.length) { throw new ErrorHandler (404, 'Lolz; No levels found!.') }
    return allLevels
}

async function create(req) {
    const newLevel = new Level(req.body);
        newLevel.name = req.body.name
        newLevel.description = req.body.description
        newLevel.access = req.body.access
        newLevel.status = true
        newLevel.created_by = req.decoded.id
        newLevel.updated_by = null
    return newLevel.save()
}

async function find(req) {
    const foundLevel = await Level.findOne({where:{id:req.params.id}})
        if(!foundLevel) { throw new ErrorHandler(404, 'Yikes, Level not found!') }
    return foundLevel
}

async function update(req) {
    const updatedLevel = await Level.findOne({where:{id:req.params.id}})
    if(!updatedLevel) { throw new ErrorHandler(404, 'Error: Level not found!') }
    else {
        if  (req.body.name != null ) { updatedLevel.name = req.body.name }
        if ( req.body.description != null ) { updatedLevel.description = req.body.description }
        if ( req.body.access != null ) { updatedLevel.access = req.body.access }
        if ( req.body.rights != null ) { updatedLevel.rights = req.body.rights }
        if ( req.body.status != null ) { updatedLevel.status = req.body.status }
        updatedLevel.updated_by = req.decoded.id
        updatedLevel.updated_at = Date()
        await updatedLevel.save()
        logsHelper.infoLogger(updatedLevel.id, ' level has been updated')
        return updatedLevel
    }   
}

 async function remove(req) {
    const levelToRemove = await Level.findOne({where:{id:req.params.id}})
    if (!levelToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Level not Found!.') }
    else {
        logsHelper.infoLogger(levelToRemove.id, ' level has been deleted')
        return Level.destroy({where:{id:req.params.id}})
    }      
}
module.exports = { list, create, find, update, remove, }