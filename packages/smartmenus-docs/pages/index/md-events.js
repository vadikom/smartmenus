import EVENTS from 'smartmenus/src/js/definitions/events'

const mdEvents = EVENTS.map((event) => {
  return `
**<a name="events-${event.label}"></a>${event.label}**  
${event.description}${
    event.appliesTo
      ? '  \nApplies to: ' + event.appliesTo.map((value) => `\`.${value}\``).join(', ')
      : ''
  }  
Cancellable: ${event.cancellable ? 'Yes' : 'No'}${
    event.detail ? `  \ne.detail: ${event.detail}` : ''
  }  
\`\`\`js
document.querySelector('#navbar1').addEventListener('${event.label}-sm', (e) => {
  console.log(e.detail)${
    event.cancellable ? '\n\n  // Cancel the event\n  // e.preventDefault()' : ''
  }
})
\`\`\`
`
}).join('')

export default mdEvents
