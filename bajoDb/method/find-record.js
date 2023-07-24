import { Query } from 'mingo'

async function findRecord ({ schema, filter = {}, options = {} } = {}) {
  const { prepPagination, pickRecord } = this.bajoDb.helper
  const { noLimit, fields } = options
  const { limit, skip, query, sort } = await prepPagination(filter, schema)
  const criteria = query ? query.toJSON : {}
  const q = new Query(criteria, { idKey: 'id' })
  const cursor = q.find(this.bajoDbMingo.storage[schema.name])
  if (!noLimit) cursor.limit(limit).skip(skip)
  if (sort) cursor.sort(sort)
  const results = cursor.all()
  for (const i in results) {
    results[i] = await pickRecord(results[i], fields)
  }
  return results
}

export default findRecord
