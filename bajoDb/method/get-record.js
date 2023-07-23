async function getRecord ({ schema, id, options = {} } = {}) {
  const { error, importPkg } = this.bajo.helper
  const { pickRecord } = this.bajoDb.helper
  const { thrownNotFound = true, fields } = options
  const { find } = await importPkg('lodash-es')
  const result = find(this.bajoDbMingo.storage[schema.name], { id })
  if (!result && thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name)
  return await pickRecord(result, fields)
}

export default getRecord
