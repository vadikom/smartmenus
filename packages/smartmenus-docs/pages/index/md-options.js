import OPTIONS from 'smartmenus/src/js/definitions/options'

const mdOptions = OPTIONS.map((option) => {
  const typeStringQuote = option.type === 'string' ? "'" : ''
  return `
**<a name="options-${option.label}"></a>${option.label}**  
${option.description}  
Default value: \`${typeStringQuote}${
    option.value
  }${typeStringQuote}\` : <span class="text-small text-muted">${option.type
    .charAt(0)
    .toUpperCase()}${option.type.slice(1)}</span>  
${
  option.lookup
    ? 'Possible values: ' +
      option.lookup.map((value) => `\`${typeStringQuote}${value}${typeStringQuote}\``).join(', ')
    : ''
}
`
}).join('')

export default mdOptions
