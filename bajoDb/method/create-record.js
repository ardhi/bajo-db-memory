import getRecord from './get-record.js'

async function createRecord ({ schema, body, options = {} } = {}) {
  const { generateId, error } = this.bajo.helper
  const { sanitizeBody, pickRecord } = this.bajoDb.helper
  const { fields } = options
  const newBody = await sanitizeBody({ body, schema })
  newBody.id = generateId()
  const exist = await getRecord.call(this, { schema, id: newBody.id, options: { thrownNotFound: false } })
  if (exist) throw error('Record \'%s@%s\' exists already!', newBody.id, schema.name)
  this.bajoDbMingo.storage[schema.name].push(newBody)
  return await pickRecord(newBody, fields)
}

export default createRecord
