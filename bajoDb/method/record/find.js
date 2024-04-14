import { Query } from 'mingo'

async function find ({ schema, filter = {}, options = {} } = {}) {
  const { prepPagination, importPkg } = this.bajoDb.helper
  const { omit } = await importPkg('lodash-es')
  const { limit, skip, query, sort, page } = await prepPagination(filter, schema)
  const criteria = query ?? {}
  const q = new Query(criteria, { idKey: 'id' })
  let cursor = q.find(this.bajoDbMemory.storage[schema.name])
  let count = 0
  if (options.count && !options.dataOnly) count = cursor.count()
  cursor = q.find(this.bajoDbMemory.storage[schema.name])
  if (sort) cursor.sort(sort)
  if (!options.noLimit) cursor.skip(skip).limit(limit)
  let result = { data: cursor.all(), page, limit, count, pages: Math.ceil(count / limit) }
  if (!options.count) result = omit(result, ['count', 'pages'])
  return result
}

export default find
