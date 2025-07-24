const ucFirst = (text = "") => text.length > 0 && text?.[0].toUpperCase() + text.slice(1)

export default ucFirst