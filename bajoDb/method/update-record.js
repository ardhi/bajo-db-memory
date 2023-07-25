import getRecord from './get-record.js'

async function updateRecord ({ schema, id, body, options } = {}) {
  const { importPkg } = this.bajo.helper
  const { findIndex, merge } = await importPkg('lodash-es')
  const { thrownNotFound = true } = options
  const old = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  const idx = findIndex(this.bajoDbMingo.storage[schema.name], { id })
  const current = this.bajoDbMingo.storage[schema.name][idx]
  this.bajoDbMingo.storage[schema.name][idx] = merge(current, body)
  const result = this.bajoDbMingo.storage[schema.name][idx]
  return { old, new: result }
}

export default updateRecord
