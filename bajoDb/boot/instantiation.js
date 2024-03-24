async function instantiation ({ connection, schemas, noRebuild }) {
  const { importPkg } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  this.bajoDbMemory.storage = this.bajoDbMemory.storage ?? {}
  const instance = pick(connection, ['name', 'type'])
  this.bajoDbMemory.instances = this.bajoDbMemory.instances ?? []
  this.bajoDbMemory.instances.push(instance)
  // if (noRebuild) return
  for (const schema of schemas) {
    this.bajoDbMemory.storage[schema.name] = this.bajoDbMemory.storage[schema.name] ?? [] // init empty coll
  }
}

export default instantiation
