import getRecord from './get.js'

async function remove ({ schema, id, options = {} } = {}) {
  const { importPkg } = this.bajo.helper
  const { noResult } = options
  const { findIndex, pullAt } = await importPkg('lodash-es')
  const rec = noResult ? undefined : await getRecord.call(this, { schema, id })
  const idx = findIndex(this.bajoDbMemory.storage[schema.name], { id })
  pullAt(this.bajoDbMemory.storage[schema.name], [idx])
  if (noResult) return
  return { oldData: rec.data }
}

export default remove
