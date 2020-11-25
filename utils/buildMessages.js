function buildMessages(entity, action) {
  if(action === 'list') {
    return `${entity}s ${action}ed`
  }
  return `${entity} ${action}`
}

module.exports = buildMessages