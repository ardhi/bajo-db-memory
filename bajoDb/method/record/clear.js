async function clear ({ schema, options = {} } = {}) {
  this.bajoDbMingo.storage[schema.name] = []
  return true
}

export default clear
