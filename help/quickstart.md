# Quickstart Guide

### Required:
- [The Parsec Hosting Client](https://parsec.app/downloads)
  - See [Hosting hardware requirements](https://support.parsec.app/hc/en-us/articles/4425688194189-Hardware-and-Software-Compatibility) to check your computer's compatibility.
- [This Extension](https://dashboard.twitch.tv/extensions/jacg3268f2bai475b14xk8q5dse21i-0.0.1)

## How to Use Controller-Pass:
### Twitch Side
1. Go live on [Twitch.tv](twitch.tv).
2. Navigate to the "Stream Manager" tab on the left side of your [Twitch stream dashboard](https://dashboard.twitch.tv).
3. Open up the "Quick Actions" panel. By default, this should be placed underneath your stream preview window.
  - You can reset to the default layout by clicking the "Stream Manager" dropdown on the top left, choosing "Reset to Default," and saving changes.
4. Click the "Controller Pass" Quick Action.
  - This will load in a seperate window, some browsers block pop-ups by default. You may have to make an exception in your browser for dashboard.twitch.tv.

### Parsec Side
1. Open the [Parsec App](parsec://&) and login.
2. Click the "Share" button under the computer you would like to stream.
  - Parsec may initialize with no computers available. Click the "refresh" button in the top right to update the list, or wait a couple seconds for the program to auto-refresh.
  - This will automatically copy the share link to your clipboard. If you misplace the link, you can copy it again by right clicking the text-box.

### Pass The Controller!
1. Switch back to the "Controller-Pass" Quick Action window.
2. Paste the Parsec join link into the "Parsec Link" input section.
3. Enter the username of a viewer into the " Twitch Username" input.
4. Click "Pass the Controller" to give the viewer control!

Controller-Pass is still in testing! If you have any errors, see [troubleshooting.md](https://github.com/satasatalight/controller-pass/blob/main/help/troubleshooting.md) for more detailed explanations and solutions. If you are still confused, or have an undocumented issue, join the [Discord](discord.gg) for help.

## Reccomendations
Following the instructions above, you can get the extension running with the default Parsec setup pretty easily. However, there are a couple additional settings and reminders you can follow to make the extension work as smoothly as possible.

### Refresh Your Join Link
Each time you pass the controller, make sure to invalidate your previous Parsec join link and send a new one so past users can't continue to connect. To refresh your link:

1. Click the red "X" icon on the right of the link.
2. Generate a new link by clicking the "Share" button again.

Now, your previous link is inavlidated and you have a new link available to [pass the controller](https://github.com/satasatalight/controller-pass/blob/main/help/quickstart.md#pass-the-controller) with.

### Limit the Stream Window
By default, Parsec streams your entire primary monitor. To avoid sharing any private information, you should limit the stream to only your gameplay window. To do this:

1. Open the [Parsec App](parsec://&) while having your game window ready and open.
2. Navigate to the settings menu by clicking the gear icon on the left sidebar.
3. Click the "Approved Apps" tab listed on the top.
4. Enable the feature by opening the dropdown menu and clicking "On". By default, the dropdown should read "Off".

You will now see a checklist of open applications that Parsec has detected on your computer. Check off each application you want viewers to be able to interact with by clicking the empty box to the left of the program's icon. We reccomend only enabling the game window unless you intend viewers to use other elements onscreen. 

### Set Games to Borderless Fullscreen
This process requires a lot of switching between windows! Which can mess with some games' functionality if done too often. 

Most modern titles have a display option called "Borderless Fullscreen" which allows you to more easily multitask between applications. For older games, you might be better using the "Windowed" display option.

These options are listed under different places in different games, but they are typically found under a "Graphics" or "Display" system setting tab.

### Remember the Parsec Hotkeys
To avoid opening Parsec as often, you should learn the global hotkeys Parsec provides to easily control functionality of the app without opening the window. The most common default hotkeys you should know for this extension are:

- Accept All: `Ctrl + F1` for accepting new viewer requests to join.
- Kick All: `Ctrl + F3` to kick all currently connected viewers when invalidating a join link.

You can always do these actions through the Parsec UI's bottom panel, however learning these shortcuts can make these inputs a lot snappier and move along a stream faster. You can rebind these shortcuts under the "Hotkeys" tab in the Parsec settings left panel.

### Remind Viewers to Enable the Extension
Controller-pass is still a "Testing Extension" on Twitch! As such, viewers need to manually opt-in to participate. 

You might want to remind viewers to enable the extension while live. To enable the extension:

1. Hover over the livestream.
2. Click the controller icon on the right of the stream window.
3. Read the warning on extensions not evaluated by Twitch.
4. Click "Accept" to opt-in.