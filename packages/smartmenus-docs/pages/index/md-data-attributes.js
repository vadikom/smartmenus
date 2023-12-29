import DATA_ATTRIBUTES from 'smartmenus/src/js/definitions/data-attributes'

const mdDataAttributes = DATA_ATTRIBUTES.map((attr) => {
  return `
**<a name="data-attributes-${attr.label}"></a>${attr.label}**  
${attr.description}  
${attr.appliesTo ? 'Applies to: ' + attr.appliesTo.map((value) => `\`.${value}\``).join(', ') : ''}
`
}).join('')

export default mdDataAttributes
