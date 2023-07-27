async function instantiation ({ connection, schemas, noRebuild }) {
  this.bajoDbMingo.storage = this.bajoDbMingo.storage || {}
  if (noRebuild) return
  for (const schema of schemas) {
    this.bajoDbMingo.storage[schema.name] = this.bajoDbMingo.storage[schema.name] || [] // init empty coll
  }
}

export default instantiation
