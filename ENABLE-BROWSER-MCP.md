# Enable Browser MCP (cursor-ide-browser)

The agent couldn't use live browser automation because the **cursor-ide-browser** MCP tools weren't available in the session. Here's how to fix it.

---

## Quick Fix (Cursor Settings)

1. **Open Cursor Settings**
   - Mac: `Cmd + ,`
   - Or: Cursor menu → Settings

2. **Go to the MCP / Tools section**
   - In the *left* settings sidebar, look for **Tools & MCP**, **MCP**, or similar
   - **Note:** This is different from **Agents** → Protection. "Browser Protection" there just toggles whether the agent is *allowed* to use browser tools—it doesn't enable the MCP server itself.

3. **Find the Browser MCP**
   - In the MCP/Tools section, look for **Browser** or **cursor-ide-browser** in the server list
   - If it's listed but greyed/off → turn it **on**
   - If it's not listed → look for **Add to Cursor** or an install option for MCP servers

4. **Restart**
   - Restart Cursor (or start a new Composer chat) so the tools are picked up

### If you don't see any MCP section or Browser option
Some Cursor versions/plans don't expose the browser MCP in settings. The Morgan review was done via code inspection instead; it's still valid, just not live-clicked.

---

## If That Doesn't Work

### Check 1: Cursor version
There was a known bug in Cursor v2.2.20 where `browser_navigate` failed with "No server found." Updating to the latest Cursor may resolve it.

### Check 2: Browser tab required
The browser MCP expects an existing browser tab to control. Before asking the agent to browse:
1. Open a browser tab (Chrome/Edge with Cursor extension, or Cursor's built-in browser)
2. Navigate anywhere (e.g., `about:blank`) or leave it open
3. Then ask the agent to browse

### Check 3: MCP settings location
- **Global**: `~/.cursor/mcp.json` (affects all projects)
- **Project**: `.cursor/mcp.json` in this repo

The cursor-ide-browser is usually a **provider-based** (built-in) server, so it may not appear in `mcp.json`. If you've added other MCP servers manually, ensure none conflict.

---

## Verify It's Working

Start a new Composer chat and ask:
> "Navigate to localhost:8888 and take a screenshot of the page."

If the agent can call `browser_navigate` and `browser_snapshot`, it's working.
