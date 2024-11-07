const { Router } = require('express');
const router = Router();
const Musician = require('../../models/Musician');
const { check, validationResult } = require('express-validator')


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

router.post("/", [
    // Validation for "name" field
    check("name")
        .notEmpty().withMessage("Name is required")
        .trim()
        .not().isIn([""]).withMessage("Name cannot be whitespace"),

    // Validation for "instrument" field
    check("instrument")
        .notEmpty().withMessage("Instrument is required")
        .trim()
        .not().isIn([""]).withMessage("Instrument cannot be whitespace"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        
        // Check if there are validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        
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