async function exists ({ schema, options = {} }) {
  this.bajoDbMemory.storage[schema.name] = []
}

export default exists
