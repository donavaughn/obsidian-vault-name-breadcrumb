const { Plugin } = require('obsidian');

// Publishes the vault name (= vault folder name) as a CSS variable so the
// reformat-breadcrumb snippet can show it as the root crumb without hardcoding it.
const VAR_NAME = '--breadcrumb-vault-name';

module.exports = class VaultNameBreadcrumb extends Plugin {
    onload() {
        this.setVar(document);

        // Popout windows have their own document, so set the variable there too
        this.registerEvent(this.app.workspace.on('window-open', (win) => this.setVar(win.doc)));
    }

    onunload() {
        document.body.style.removeProperty(VAR_NAME);
        this.app.workspace.iterateAllLeaves((leaf) => {
            leaf.view.containerEl.doc.body.style.removeProperty(VAR_NAME);
        });
    }

    setVar(doc) {
        // JSON.stringify yields a quoted, escaped string, which is what CSS `content` needs
        doc.body.style.setProperty(VAR_NAME, JSON.stringify(this.app.vault.getName()));
    }
};
