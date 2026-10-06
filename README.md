# Vault Name Breadcrumb

An [Obsidian](https://obsidian.md) CSS snippet and companion plugin that replace the note header with a compact breadcrumb starting at the vault's name, so you always know which vault you're in.

| | Default Obsidian header | With Vault Name Breadcrumb |
| --- | --- | --- |
| Note in a folder | `Projects / Specs / My note` | `MyVault / Projects / Specs` |
| Note at the vault root | `My note` | `MyVault` |

- The note title is hidden from the header, and the folder path is shown as one highlighted box in your theme's accent color.
- The vault name is read automatically from the vault folder name, so the same files work in every vault.
- Notes at the vault root show the vault name instead of a blank header.

## How it works

CSS can't read the vault name, so the work is split in two:

- **`reformat-breadcrumb.css`** (CSS snippet) does all the styling and adds `var(--breadcrumb-vault-name)` in front of the folder path.
- **`vault-name-breadcrumb/`** (plugin, about 25 lines of plain JavaScript, no build step) sets that CSS variable to `app.vault.getName()` in every window.

If the plugin is off, the snippet still works and shows the fallback name **Vault**.

## Install

1. Copy the `vault-name-breadcrumb` folder into `<vault>/.obsidian/plugins/`.
2. Copy `reformat-breadcrumb.css` into `<vault>/.obsidian/snippets/`.
3. In Obsidian, go to **Settings → Community plugins**, refresh **Installed plugins**, and turn on **Vault Name Breadcrumb**. Restricted mode must be off.
4. Go to **Settings → Appearance → CSS snippets**, refresh, and turn on `reformat-breadcrumb`.

Repeat for each vault. This plugin is not in the Obsidian community plugin store.

## Documentation

- [User Guide](Vault%20Name%20Breadcrumb%20-%20User%20Guide.md): installing, customizing, troubleshooting, uninstalling
- [Design](Vault%20Name%20Breadcrumb%20-%20Design.md): architecture, CSS rules, plugin lifecycle, design decisions

The documents are written for Obsidian: open the folder as a vault, or copy them into one, so the `[[wikilinks]]` and callouts render.

## Compatibility

Tested on Obsidian desktop for Windows and macOS. Mobile is untested. The snippet relies on Obsidian's internal header class names (`view-header-title`, `view-header-title-parent`, `view-header-title-container`), which a future Obsidian update could change.

## License

[MIT](LICENSE)
