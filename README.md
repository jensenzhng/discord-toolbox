# Discord Toolbox (Instant Nitro sniper and Server Joiner)

`config.json` field explanations:

`monitoringtoken`: the discord token of the account of which you want to monitor with

`claimertoken`: the discord token of the account that will join invites

`webhookid`: the id of your discord webhook ie. for the webhook   
https://discord.com/api/webhooks/776296627812040292/JGrd0godqZrIs4OZf0uXdajrY2bpJzbXrdzd78TXYJdTlFcqMNaybwbnfloO73TGQYBU the webhook id would be 776296627812040292

`webhooktoken`: the token for your webhook, ie JGrd0godqZrIs4OZf0uXdajrY2bpJzbXrdzd78TXYJdTlFcqMNaybwbnfloO73TGQYBU from the example above

`channels`: put channel ids separated by spaces here or put all to monitor all channels

`openLinks`: the bot will open up all non-identical links, put either true or false

`showMessages`: this will log out each message received, put true or false

`linkReset`: if the bot receives two identical links one after the other, it will only open the first one. put a number in seconds here so that after the number of second passes, the bot will cleaar the identical links in memory 

## Pretty big disclaimer

Self botting is against the Discord TOS, and may result in your Discord Account getting banned or suspended. This is purely for education purposes, ie. learning the basics of HTTPs requests and functions as a proof of concept. 
