import getRecord from './get.js'

async function update ({ schema, id, body, options } = {}) {
  const { importPkg } = this.bajo.helper
  const { findIndex, merge } = await importPkg('lodash-es')
  const old = await getRecord.call(this, { schema, id })
  const idx = findIndex(this.bajoDbMingo.storage[schema.name], { id })
  const current = this.bajoDbMingo.storage[schema.name][idx]
  this.bajoDbMingo.storage[schema.name][idx] = merge(current, body)
  const result = this.bajoDbMingo.storage[schema.name][idx]
  return { oldData: old.data, data: result }
}

export default update
