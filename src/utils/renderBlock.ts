import Block from "../classes/Block";

export default function renderBlock(query: string, block: Block) {
    const root = document.querySelector(query);
    const content = block.getContent()
    if (content) {
        root?.appendChild(content);
    }
    return root;
}