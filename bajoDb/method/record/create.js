import getRecord from './get.js'

async function create ({ schema, body, options = {} } = {}) {
  const { error } = this.bajo.helper
  const exist = await getRecord.call(this, { schema, id: body.id, options: { thrownNotFound: false } })
  if (exist.data) throw error('Record \'%s@%s\' exists already!', body.id, schema.name)
  this.bajoDbMingo.storage[schema.name].push(body)
  return { data: body }
}

export default create
