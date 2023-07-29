async function exists (schema) {
  this.bajoDbMingo.storage[schema.name] = []
}

export default exists
