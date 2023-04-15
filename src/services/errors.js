export const formatErrors = (errors) => {
  const errorsFormated = {}

  errors.forEach((error) => {
    if (error['field'] !== undefined) {
      errorsFormated[error['field']] = error.message
    }
  })

  return errorsFormated
}
