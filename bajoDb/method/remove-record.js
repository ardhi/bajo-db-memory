import getRecord from './get-record.js'

async function removeRecord ({ schema, id, options = {} } = {}) {
  const { importPkg } = this.bajo.helper
  const { findIndex, pullAt } = await importPkg('lodash-es')
  const { thrownNotFound = true } = options
  const rec = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  const idx = findIndex(this.bajoDbMingo.storage[schema.name], { id })
  pullAt(this.bajoDbMingo.storage[schema.name], [idx])
  return rec
}

export default removeRecord
