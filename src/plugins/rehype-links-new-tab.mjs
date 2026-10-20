// Opens every link in Markdown/MDX doc content in a new tab.
// Same-page anchors (#...) and mailto:/tel: links are left alone, because
// opening those in a new tab only produces a blank or duplicate tab.
const SKIP = /^(#|mailto:|tel:)/i;

function walk(node) {
	if (node.type === 'element' && node.tagName === 'a') {
		const href = node.properties?.href;
		if (typeof href === 'string' && !SKIP.test(href)) {
			node.properties.target = '_blank';
			node.properties.rel = ['noopener', 'noreferrer'];
		}
	}
	if (node.children) node.children.forEach(walk);
}

export default function rehypeLinksNewTab() {
	return (tree) => walk(tree);
}
