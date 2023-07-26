async function instantiation ({ connection, schemas, noRebuild }) {
  this.bajoDbMingo.storage = this.bajoDbMingo.storage || {}
  for (const schema of schemas) {
    this.bajoDbMingo.storage[schema.name] = [] // init empty coll
  }
}

export default instantiation
