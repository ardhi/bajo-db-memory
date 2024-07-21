async function bajoDbAfterStart () {
  const { importModule } = this.app.bajo
  const { filter, map } = this.app.bajo.lib._

  const addFixtures = await importModule('bajoDb:/lib/add-fixtures.js')
  const conns = filter(this.app.bajoDb.connections, { type: 'memory:memory' })
  const schemas = filter(this.app.bajoDb.schemas, s => {
    const names = map(conns, 'name')
    return names.includes(s.connection)
  })
  if (schemas.length === 0) return
  this.log.debug('Adding fixture for memory database')
  for (const schema of schemas) {
    if (this.config.persistence.collections.includes(schema.name)) {
      this.log.warn('\'%s\' is a memory persistence collection. Adding records from fixture is ignored!', schema.name)
      continue
    }
    let { success, error } = await addFixtures.call(this.app.bajoDb, schema.name)
    success = success ?? 0
    error = error ?? 0
    this.log.trace('- %s@%s (%d/%d)', schema.name, schema.connection, success, success + error)
  }
}

export default bajoDbAfterStart
