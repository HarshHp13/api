const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')

const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new  Error('Please add a text body')
    }

    const goal = await Goal.create({
        text: req.body.text,
    })

    res.status(200).json(goal)
})

const putGoal = asyncHandler(async (req,res) => {

    const goal = await Goal.find({id:`${req.params.id}`})

    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req,res) => {

    const goal = await Goal.find({id:`${req.params.id}`})

    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }

    const deleted = await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json({id: deleted.id})
})

module.exports = {
    getGoals,
    setGoal,
    putGoal,
    deleteGoal
}