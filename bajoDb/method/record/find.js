import { Query } from 'mingo'

async function find ({ schema, filter = {}, options = {} } = {}) {
  const { prepPagination } = this.bajoDb.helper
  const { noLimit, dataOnly } = options
  const { limit, skip, query, sort, page, noCount } = await prepPagination(filter, schema)
  const criteria = query ?? {}
  const q = new Query(criteria, { idKey: 'id' })
  let cursor = q.find(this.bajoDbMingo.storage[schema.name])
  let count = 0
  if (!noCount && !dataOnly) count = cursor.count()
  cursor = q.find(this.bajoDbMingo.storage[schema.name])
  if (sort) cursor.sort(sort)
  if (!noLimit) cursor.skip(skip).limit(limit)
  return { data: cursor.all(), page, limit, count, pages: Math.ceil(count / limit) }
}

export default find
