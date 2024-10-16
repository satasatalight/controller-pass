# Error Guide
This document lists all errors you can get while using the controller-pass backend. 

To setup controller-pass, check [quickstart.md](https://github.com/satasatalight/controller-pass/blob/main/help/quickstart.md). If you are still confused, or have an undocumented issue, join the [Discord](discord.gg) for help.

## Parsec Link
### Don't Include Weird Characters!
The banned characters are ` ,!?@#$%^&*()``~_-+=[]{};'"<>|`.  
If you are getting this error, you probably entered a spacebar character on accident.

### Link doesn't start with 'https://parsec.gg/g/'!
Make sure to keep the https:// at the beginning of the parsec link.  
The extension parses links by forward slashes to find the peer_id and host_secret.

### Invalid link format!
Make sure you didn't remove any characters in the link past 'https://parsec.gg/g/'.  
The extension parses links by forward slashes to find the peer_id and host_secret.  
Your peer_id should be the 27 characters after '/g/' in the link. Your host_secret should be the 8 characters right after the next forward slash.

### Refresh your invite link!
Each time you pass the controller, you should refresh your join link to prevent past viewers from joining.  
To refresh your link and generate a new host_secret, check the [quickstart guide](https://github.com/satasatalight/controller-pass/blob/main/help/quickstart.md#refresh-your-join-link).

## Twitch Username
### Invalid Username!
The username you entered does not follow twitch's guidelines on username requirements.  
Twitch Usernames must be between 4 and 25 characters and can only be written with letters, numbers and underscores.

### User doesn't Exist!
The username you entered wasn't found by the Twitch API.  
If you are getting this error, you probably misspelled the username.  
This error *could* also happen if you hit the Twitch API limit. The limit is 100 requests per minute, wait a minute before retyping the username.
