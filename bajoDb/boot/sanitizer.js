async function sanitizer (connection) {
  const { importPkg } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  const result = pick(connection, ['type', 'name', 'driver'])
  result.memory = true
  return result
}

export default sanitizer
