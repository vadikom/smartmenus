import METHODS from 'smartmenus/src/js/definitions/methods'

function getMethodsMd(type) {
  return METHODS.filter((method) => type === method.type)
    .map((method) => {
      return `
**<a name="methods-${type}-${method.label}"></a>${method.label}**  
${method.description}
${
  method.code
    ? `\`\`\`js
${method.code}
\`\`\``
    : ''
}
`
    })
    .join('')
}

const mdMethods = {
  static: getMethodsMd('static'),
  instance: getMethodsMd('instance')
}

export default mdMethods
