import { Query } from 'mingo'

async function count ({ schema, filter = {}, options = {} } = {}) {
  const { prepPagination } = this.bajoDb.helper
  const { query } = await prepPagination(filter, schema)
  const criteria = query ?? {}
  const q = new Query(criteria, { idKey: 'id' })
  const cursor = q.find(this.bajoDbMemory.storage[schema.name])
  const count = cursor.count()
  return { data: count }
}

export default count
