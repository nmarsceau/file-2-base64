export class CustomOutput extends HTMLElement {
	rendered = false

	label = ""
	value = ""

	constructor() {
		super()
	}

	connectedCallback() {
		this.render()
	}

	render() {
		if (!this.rendered) {
			// Create a shadow root
			const shadowRoot = this.attachShadow({ mode: "open" })
	
			// Create the container
			const container = document.createElement("article")
			container.setAttribute("tabindex", "0")
			container.setAttribute("aria-label", this.label)

			// Create the header
			const header = document.createElement("header")
	
			// Create label
			const label = document.createElement("label")
			label.setAttribute("id", "outputLabel")
			label.setAttribute("for", "output")
			label.textContent = this.label
	
			// Create copy button
			const copy = document.createElement("button")
			copy.classList.add("copy")
			copy.setAttribute("aria-label", `Copy ${this.label} to clipboard`)
			copy.innerHTML = `<svg aria-hidden="true" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path d="m11.5 9.5v-7c0-1.1045695-.8954305-2-2-2h-7c-1.1045695 0-2 .8954305-2 2v7c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2z"/><path d="m3.5 11.5v1c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-1"/></g></svg>`
			copy.addEventListener("click", () => {
				navigator.clipboard.writeText(this.value).catch(err => { console.error(err) })
			})

			// Create remove button
			const remove = document.createElement("button")
			remove.classList.add("remove")
			remove.setAttribute("aria-label", `Remove ${this.label}`)
			remove.innerHTML = `<svg aria-hidden="true" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"><path d="m10.5 10.5-10-10z"/><path d="m10.5.5-10 10"/></g></svg>`
			remove.addEventListener("click", () => {
				this.remove()
			})
	
			// Create output
			const output = document.createElement("output")
			output.setAttribute("id", "output")
			output.textContent = this.value
	
			// Create some CSS to apply to the shadow dom
			const style = document.createElement("style")
			style.textContent = `
				:host {
					text-align: initial;
					--accent-color: #ffaf4d;
					--accentDarkColor: #ff981a;
					--textColor: #383838;
				}

				article {
					border-block-start-width: 0;
					border-radius: 0.5rem;
					margin-block-end: 1em;
					font-family: monospace;
					break-inside: avoid;
				}

				header {
					color: var(--textColor);
					display: grid;
					grid-template-columns: 1fr min-content min-content;
					grid-template-rows: min-content min-content;
					grid-template-areas:
						"label copy remove"
						"output output output"
					;
				}

				label {
					grid-area: label;
					font-size: 1.2em;
					border-top-left-radius: 0.5em;
					border-top: 3px solid var(--accent-color);
					border-left: 3px solid var(--accent-color);
					background-color: var(--accent-color);
					padding-inline-start: 0.5em;
				}

				button.copy {
					grid-area: copy;
				}

				button.remove {
					grid-area: remove;
					border-top-right-radius: 0.5em;
				}

				button.copy, button.remove {
					background-color: var(--accent-color);
					color: var(--textColor);
					outline: none;
					border: none;
					display: flex;
					align-items: center;
					min-height: 26px;
					cursor: pointer;
				}

				button:hover, button:focus {
					background-color: var(--accentDarkColor);
					border-color: var(--accentDarkColor);
				}

				output {
					grid-area: output;
					max-width: 100%;
					font-size: 1.4em;
					padding-inline: 0.5em;
					border-bottom-left-radius: 0.5em;
					border-bottom-right-radius: 0.5em;
					border-left: 3px solid var(--accent-color);
					border-right: 3px solid var(--accent-color);
					border-bottom: 3px solid var(--accent-color);

					/* Make it display 2 lines max, then truncate with ellipsis */
					overflow: hidden;
					overflow-wrap: anywhere;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
  					-webkit-line-clamp: 2;
				}
			`
	
			// Attach the created elements to the shadow dom
			header.appendChild(label)
			header.appendChild(copy)
			header.appendChild(remove)
			container.appendChild(header)
			container.appendChild(output)
			shadowRoot.appendChild(style)
			shadowRoot.appendChild(container)
	
			this.rendered = true
		}
	}
}
