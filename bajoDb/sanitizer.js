async function sanitizer (connection) {
  const { importPkg } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  return pick(connection, ['type', 'name', 'driver'])
}

export default sanitizer
