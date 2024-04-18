async function get ({ schema, id, options = {} } = {}) {
  const { error } = this.bajo.helper
  const { thrownNotFound = true } = options
  const { find } = this.bajo.helper._
  const result = find(this.bajoDbMemory.storage[schema.name], { id })
  if (!result && thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name, { statusCode: 404 })
  return { data: result }
}

export default get
