import getRecord from './get.js'

async function update ({ schema, id, body, options } = {}) {
  const { noResult } = options
  const { findIndex, merge } = this.bajo.helper._
  const old = noResult ? undefined : await getRecord.call(this, { schema, id })
  const idx = findIndex(this.bajoDbMemory.storage[schema.name], { id })
  const current = this.bajoDbMemory.storage[schema.name][idx]
  this.bajoDbMemory.storage[schema.name][idx] = merge(current, body)
  if (noResult) return
  const result = this.bajoDbMemory.storage[schema.name][idx]
  return { oldData: old.data, data: result }
}

export default update
