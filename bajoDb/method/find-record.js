import { Query } from 'mingo'

async function findRecord ({ schema, filter = {}, options = {} } = {}) {
  const { prepPagination } = this.bajoDb.helper
  const { noLimit } = options
  const { limit, skip, query, sort } = await prepPagination(filter, schema)
  const criteria = query ? query.toJSON : {}
  const q = new Query(criteria, { idKey: 'id' })
  const cursor = q.find(this.bajoDbMingo.storage[schema.name])
  if (!noLimit) cursor.limit(limit).skip(skip)
  if (sort) cursor.sort(sort)
  return cursor.all()
}

export default findRecord
