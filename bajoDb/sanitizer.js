async function sanitizer ({ connection, options } = {}) {
  const { importPkg } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  return pick(connection, ['type', 'name', 'driver'])
}

export default sanitizer
