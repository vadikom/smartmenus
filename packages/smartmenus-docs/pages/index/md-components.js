import COMPONENTS, { LAYOUT_CUSTOM_PROPERTIES } from 'smartmenus/src/js/definitions/components'

function getDescription(component) {
  return `  **\`.${component.value}\`**  \n${component.description.replace(/[\n]/g, '\n  ')}  
${getCustomProperties(component)}\n\n`
}

function getCustomProperties(component) {
  let value = ''
  const customProperties = LAYOUT_CUSTOM_PROPERTIES.filter((customProperty) =>
    customProperty.appliesTo.includes(component.value)
  )
  if (customProperties.length) {
    value = `  Related layout variables:

  \`\`\`scss
${customProperties
  .map((customProperty) => {
    return `  $${customProperty.label.substring(5)}: ${customProperty.value};`
  })
  .join('\n')}
  \`\`\`

  \`\`\`css
  .sm-navbar {
${customProperties
  .map((customProperty) => {
    return `    ${customProperty.label}: ${customProperty.value};`
  })
  .join('\n')}
  }
  \`\`\``
  }
  return value
}

const mdComponents = COMPONENTS.map((component) => {
  return `
<dl><dt>

##### <a name="style-layout-components-${component.value}"></a>${component.label}

</dt><dd>

${
  component.variants
    ? `${getDescription(component)}\n\nVariants:\n\n` +
      component.variants
        .map((variant) => {
          return `
- <a name="style-layout-components-${variant.value}"></a> **${
            variant.label
          } ${component.label.toLowerCase()}**

 ${getDescription(variant)}
`
        })
        .join('')
    : getDescription(component)
}

</dd></dl>
`
}).join('')

export default mdComponents
