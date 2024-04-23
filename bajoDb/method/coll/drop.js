async function exists ({ schema, options = {} }) {
  this.bajoDbMemory.storage[schema.name].splice(0)
}

export default exists
