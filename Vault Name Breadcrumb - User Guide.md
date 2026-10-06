---
type: guide
created: 2026-10-05
author: donavaughn
version: 1.0.0
updated: 2026-10-06
tags:
  - obsidian
  - css-snippet
  - plugin
  - how-to
---

This setup changes the header at the top of each note to show a single breadcrumb that starts with the vault's name, so you can always tell which vault you're in.

> [!info] Related
> How it works internally is covered in [[Vault Name Breadcrumb - Design]].

## What it does

| | Default Obsidian header | With Vault Name Breadcrumb |
| --- | --- | --- |
| Note in a folder | `Projects / Specs / My note` | `Code / Projects / Specs` |
| Note at the vault root | `My note` | `Code` |

- The note title is hidden from the header. It still appears as the tab name and, if your settings show it, as the inline title.
- The folder path appears as one highlighted box in your theme's accent color.
- The vault name comes first. You never type it: the plugin reads it from the vault folder's name.
- The folder names in the breadcrumb still work as links. The vault name does not.

## Requirements

- Obsidian desktop (tested on Windows and macOS). Mobile has not been tested.
- Community plugins allowed in the vault (**Settings → Community plugins**, restricted mode off).
- Two items from this repository:
    - `reformat-breadcrumb.css`, the CSS snippet
    - `vault-name-breadcrumb/`, the plugin folder (contains `main.js` and `manifest.json`)

## Installing in a vault

> [!tip] Finding the `.obsidian` folder
> `.obsidian` is a hidden folder at the top of the vault folder. In File Explorer, turn on **View → Show → Hidden items** if you can't see it.

1. Copy the `vault-name-breadcrumb` folder into the vault's `.obsidian/plugins/` folder. Create `plugins` if it doesn't exist.
2. Copy `reformat-breadcrumb.css` into the vault's `.obsidian/snippets/` folder. Create `snippets` if it doesn't exist.
3. In Obsidian, open that vault and go to **Settings → Community plugins**.
    1. If restricted mode is on, click **Turn on community plugins**.
    2. Click the refresh icon next to **Installed plugins**.
    3. Turn on **Vault Name Breadcrumb**.
4. Go to **Settings → Appearance → CSS snippets**, click the refresh icon, and turn on `reformat-breadcrumb`.
5. Open a note in a folder and a note at the vault root. Each should show the vault name in the header.

The finished vault should look like this:

```
<vault>/
└── .obsidian/
    ├── plugins/
    │   └── vault-name-breadcrumb/
    │       ├── main.js
    │       └── manifest.json
    └── snippets/
        └── reformat-breadcrumb.css
```

> [!warning] Shared vaults
> If a vault is synced or shared with other people, their Obsidian may also pick up the snippet and plugin. Check with the team before installing it in a shared vault.

## Updating

When the source files in this repository change, copy them over the installed copies in each vault. Then turn the snippet off and on, and turn the plugin off and on, or reload Obsidian (**Ctrl+P → Reload app without saving**).

## Customizing

All visual changes are made in `reformat-breadcrumb.css`. Edit the installed copy in the vault, or edit the source and copy it again.

| To change | Edit | Example |
| --- | --- | --- |
| Separator after the vault name | Rule **2a**, the `" / "` text | `content: var(--breadcrumb-vault-name) " › ";` |
| Text size | Rule **2**, `font-size` | `font-size: 0.9rem !important;` |
| Text color | Rule **2**, `color` | `color: var(--text-normal) !important;` |
| Box background or border | Rule **2**, `background-color` and `border` | `border: none;` |
| Name shown when the plugin is off | Rule **0**, `--breadcrumb-vault-name` | `--breadcrumb-vault-name: "Unknown vault";` |

> [!note]
> The separator in rule 2a only appears after the vault name, and it takes the accent color of the breadcrumb text. The separators between folders come from Obsidian and follow your theme, so they may be a different color (often gray).

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Breadcrumb says **Vault** | The plugin isn't running | Turn on **Vault Name Breadcrumb** under **Settings → Community plugins**. |
| Plugin isn't in the installed list | Obsidian hasn't rescanned the plugins folder, or the folder is in the wrong place | Click refresh, or restart Obsidian. Check that `main.js` and `manifest.json` sit directly in `.obsidian/plugins/vault-name-breadcrumb/`. |
| Plugin won't stay on | Error while loading | Press **Ctrl+Shift+I**, open the **Console** tab, and look for red errors mentioning `vault-name-breadcrumb`. |
| Header shows the default title and path | Snippet is off or missing | Turn on `reformat-breadcrumb` under **Settings → Appearance → CSS snippets**. |
| Vault name sits higher or lower than the folder names | Older copy of the snippet without rule 2d | Copy the current `reformat-breadcrumb.css` into `.obsidian/snippets/` and turn the snippet off and on. |
| Nothing shows for root notes | An Obsidian update changed the header markup | Inspect the header with **Ctrl+Shift+I** and compare its classes with the selectors in [[Vault Name Breadcrumb - Design#CSS snippet design]]. |
| Old vault name after renaming the vault | The vault hasn't reopened since the rename | Reload Obsidian. |

## Uninstalling

1. Turn off **Vault Name Breadcrumb** in **Settings → Community plugins**, then click the trash icon to remove it, or delete `.obsidian/plugins/vault-name-breadcrumb/`.
2. Turn off `reformat-breadcrumb` in **Settings → Appearance → CSS snippets**, and delete the file from `.obsidian/snippets/` if you no longer want it.

The header goes back to Obsidian's default right away. Neither part changes any notes.

## FAQ

**Can I click the vault name to go to the vault root?**
No. The vault name is added text, not a link. See [[Vault Name Breadcrumb - Design#Design decisions and alternatives]].

**Can I show a different name than the folder name?**
Not with the plugin, which always uses the vault folder's name. To show a different name, turn the plugin off and set the name in rule 0 of the snippet.

**Does it work in popped-out windows?**
Yes. The plugin sets the vault name in each new window as it opens.

**Is the plugin from the Obsidian community store?**
No. It's a small local plugin written for this setup. Its full source is in [[Vault Name Breadcrumb - Design#Source listing]].
