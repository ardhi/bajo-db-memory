async function get ({ schema, id, options = {} } = {}) {
  const { error, importPkg } = this.bajo.helper
  const { thrownNotFound = true } = options
  const { find } = await importPkg('lodash-es')
  const result = find(this.bajoDbMemory.storage[schema.name], { id })
  if (!result && thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name, { statusCode: 404 })
  return { data: result }
}

export default get
