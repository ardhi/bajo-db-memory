async function instantiation ({ connection, schemas, noRebuild }) {
  const { importPkg } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  this.bajoDbMingo.storage = this.bajoDbMingo.storage || {}
  const instance = pick(connection, ['name', 'type'])
  this.bajoDbMingo.instances = this.bajoDbMingo.instances || []
  this.bajoDbMingo.instances.push(instance)
  // if (noRebuild) return
  for (const schema of schemas) {
    this.bajoDbMingo.storage[schema.name] = this.bajoDbMingo.storage[schema.name] || [] // init empty coll
  }
}

export default instantiation
