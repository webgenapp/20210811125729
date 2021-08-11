const express = require('express')
const router = express.Router()
const { A } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const as = await A.findAll()

  res.send(as)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const a = await A.findOne({ where: { id } })

  res.send(a)
})

router.post('/', auth, async function (req, res, next) {
  const a = await A.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(a)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await A.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const a = await A.findOne({ where: { id } })

  a.a = req.body.a

  a.save()

  res.send(a)
})

module.exports = router
