const applyDirAuto = (parent = document) => {
  // Select both `.katex-display` and `.katex` elements that do not already have `dir="auto"`
  const elements = parent.querySelectorAll(
    '.katex-display:not([dir="auto"]), .katex:not([dir="auto"])'
  );

  elements.forEach((element) => {
    element.setAttribute("dir", "auto");

    // Apply `dir="auto"` to nested elements
    const nestedElements = element.querySelectorAll("*");
    nestedElements.forEach((nested) => {
      nested.setAttribute("dir", "auto");
    });
  });
};

applyDirAuto();

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        applyDirAuto(node);
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
