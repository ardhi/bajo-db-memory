async function instantiation ({ connection, schemas, noRebuild }) {
  const { importPkg, getConfig, getPluginDataDir, fatal } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  const fs = await importPkg('fs-extra')
  const cfg = getConfig('bajoDbMemory', { full: true })
  this.bajoDbMemory.storage = this.bajoDbMemory.storage ?? {}
  const instance = pick(connection, ['name', 'type'])
  this.bajoDbMemory.instances = this.bajoDbMemory.instances ?? []
  this.bajoDbMemory.instances.push(instance)
  // if (noRebuild) return
  for (const schema of schemas) {
    this.bajoDbMemory.storage[schema.name] = this.bajoDbMemory.storage[schema.name] ?? [] // init empty coll
  }
  if (cfg.persistence.collections.length > 0) {
    const dir = `${getPluginDataDir('bajoDbMemory')}/data`
    fs.ensureDirSync(dir)
    // load
    for (const key of cfg.persistence.collections) {
      if (!this.bajoDbMemory.storage[key]) fatal('Invalid collection for persistence: %s', key)
      const file = `${dir}/${key}.json`
      if (!fs.existsSync(file)) continue
      try {
        const data = fs.readFileSync(file, 'utf8')
        this.bajoDbMemory.storage[key] = JSON.parse(data)
      } catch (err) {
        fatal('Can\'t load %s: %s', key, err.message)
      }
    }
    // persist periodically
    setInterval(() => {
      for (const key of cfg.persistence.collections) {
        const data = this.bajoDbMemory.storage[key]
        fs.writeFileSync(`${dir}/${key}.json`, JSON.stringify(data), 'utf8')
      }
    }, cfg.persistence.period * 1000)
  }
}

export default instantiation
