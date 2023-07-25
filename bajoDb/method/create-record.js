import getRecord from './get-record.js'

async function createRecord ({ schema, body, options = {} } = {}) {
  const { error } = this.bajo.helper
  const exist = await getRecord.call(this, { schema, id: body.id, options: { thrownNotFound: false } })
  if (exist) throw error('Record \'%s@%s\' exists already!', body.id, schema.name)
  this.bajoDbMingo.storage[schema.name].push(body)
  return body
}

export default createRecord
