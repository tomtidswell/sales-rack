function errorHandler(err,req,res,next){
  console.log('entering ERROR HANDLER', err)
  if(err.message === 'Not Found') return res.status(404).json({ message: 'Not found' })
  if(err.message === 'Unauthorised') return res.status(401).json({ message: 'Unauthorised' })
  if(err.name === 'ValidationError') {
    const valErrors = {}
    for(const field in err.errors){
      valErrors[field] = err.errors[field].message
    }
    return res.status(422).json({ message: 'Unprocessable Entity', valErrors })
  }
  res.status(500).json({ message: 'Internal server error' })
  next()
}

module.exports = errorHandler
