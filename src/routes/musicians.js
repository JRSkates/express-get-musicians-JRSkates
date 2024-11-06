const { Router } = require('express');
const router = Router();
const Musician = require('../../models/Musician');

router.get("/", async (req, res) => {
    const musicians = await Musician.findAll()
    res.json(musicians);
})

router.get("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id)
    if (!musician) {
        return res.status(404).json({ message: "Musician not found" })
    }
    res.json(musician);
})

router.post("/", async (req, res) => {
    const musician = await Musician.create(req.body)
    res.status(201).json(musician);
})

router.put("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id)
    if (!musician) {
        return res.status(404).json({ message: "Musician not found" })
    }
    await musician.update(req.body)
    res.json(musician);
})

router.delete("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id)
    if (!musician) {
        return res.status(404).json({ message: "Musician not found" })
    }
    await musician.destroy()
    res.status(204).send();
})

module.exports = router;