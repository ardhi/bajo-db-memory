async function getRecord ({ schema, id, options = {} } = {}) {
  const { error, importPkg } = this.bajo.helper
  const { thrownNotFound = true } = options
  const { find } = await importPkg('lodash-es')
  const result = find(this.bajoDbMingo.storage[schema.name], { id })
  if (!result && thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name)
  return { data: result }
}

export default getRecord
