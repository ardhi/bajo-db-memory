import getRecord from './get-record.js'

async function updateRecord ({ schema, id, body, options } = {}) {
  const { importPkg } = this.bajo.helper
  const { pickRecord, sanitizeBody } = this.bajoDb.helper
  const { findIndex, merge } = await importPkg('lodash-es')
  const { thrownNotFound = true, returnOldNew, fields } = options
  let old = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  old = await pickRecord(old, fields)
  const newBody = await sanitizeBody({ body, schema, partial: true })
  delete newBody.id
  const idx = findIndex(this.bajoDbMingo.storage[schema.name], { id })
  const current = this.bajoDbMingo.storage[schema.name][idx]
  this.bajoDbMingo.storage[schema.name][idx] = merge(current, newBody)
  let result = this.bajoDbMingo.storage[schema.name][idx]
  result = await pickRecord(result, fields)
  if (returnOldNew) return { old, new: result }
  return result
}

export default updateRecord
