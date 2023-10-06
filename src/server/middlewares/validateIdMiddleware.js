const validateId = (req, res, next) => {

   const id = req.params.id

   if(!id || isNaN(id)) return res.status(400).json({message: `Id value must be numeric`})

   next()
}

module.exports = validateId