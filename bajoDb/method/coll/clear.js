async function clear ({ schema, options = {} }) {
  this.bajoDbMemory.storage[schema.name].splice(0)
  return true
}

export default clear
