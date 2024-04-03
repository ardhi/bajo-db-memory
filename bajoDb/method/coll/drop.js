async function exists (schema) {
  this.bajoDbMemory.storage[schema.name].splice(0)
}

export default exists
