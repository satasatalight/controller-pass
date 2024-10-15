# Quickstart Guide

### Required:
- [The Parsec Hosting Client](https://parsec.app/downloads)
  - See [Hosting hardware requirements](https://support.parsec.app/hc/en-us/articles/4425688194189-Hardware-and-Software-Compatibility) to check your computer's compatibility.
- [This Extension](https://dashboard.twitch.tv/extensions/jacg3268f2bai475b14xk8q5dse21i-0.0.1)

## How to Use Controller-Pass:
### Twitch Side
- Go live on [Twitch.tv](twitch.tv).
- Navigate to the "Stream Manager" tab on your [Twitch stream dashboard](https://dashboard.twitch.tv).
- Open up the "Quick Actions" panel. By default, this should be placed underneath your stream preview window.
  - You can reset to the default layout by clicking the "Stream Manager" dropdown on the top left, choosing "Reset to Default," and saving changes.
- Click the "Controller Pass" Quick Action.
  - This will load in a seperate window, some browsers block pop-ups by default. You may have to make an exception in your browser for dashboard.twitch.tv.

### Parsec Side
- Open the [Parsec App](parsec://) and login.
- Click the "Share" button under the computer you would like to stream.
  - Parsec may initialize with no computers available. Click the "refresh" button in the top right to update the list, or wait a couple seconds for the program to auto-refresh.
- Copy the share link using the clipboard icon.

### Pass The Controller!
- Switch back to the "Controller-Pass" Quick Actions window.
- Paste the Parsec join link into the "Parsec Link" input section.
- Enter the Twitch Username of a viewer into the "Username" input.
- Click "Pass the Controller" to give the viewer control!

Controller-Pass is still in testing! If you have any errors, see [troubleshooting.md](https://github.com/satasatalight/controller-pass/blob/main/help/troubleshooting.md) for more detailed explanations and solutions. If you are still confused, or have an undocumented issue, join the [Discord](discord.gg) for help.

## Reccomendations
Following the instructions above, you can get the extension running with the default Parsec setup pretty easily. However, there are a couple additional settings and reminders you can follow to make the extension work as smoothly as possible.

### Refresh Your Join Link
Each time you pass the controller, make sure to invalidate your previous Parsec join link and send a new one so past users can't continue to connect. To refresh your link:

- Hover over your share link
- Click the red "X" icon on the right of the link

Now, repeat the [Parsec Side steps](https://github.com/satasatalight/controller-pass/blob/main/help/quickstart.md#parsec-side) from earlier.

### Limit the Stream Window
By default, Parsec streams your entire primary monitor. To avoid sharing any private information, you should limit the stream to only your gameplay window. To do this:

