async function exists (schema) {
  this.bajoDbMemory.storage[schema.name] = []
}

export default exists
