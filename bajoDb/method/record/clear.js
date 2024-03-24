async function clear ({ schema, options = {} } = {}) {
  this.bajoDbMemory.storage[schema.name] = []
  return true
}

export default clear
