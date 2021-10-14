const Discord = require('discord.js.old');
const bot = new Discord.Client();
const request = require('request');
const chalk = require('chalk');
const config = require('./config.json');
const webhook = new Discord.WebhookClient(config.webhookid, config.webhooktoken);
const open = require("open");
let linkStorage = "";

console.log(chalk.blue.bold("Welcome to dragonlordslayer69's discord toolbox! Includes:"));
console.log(chalk.blue.bold("    - autojoiner"));
console.log(chalk.blue.bold("    - auto link opener"));

bot.on("ready", () => {
    console.log(chalk.blueBright('----------------------------------------------------------'))
    console.log(chalk.blueBright('[Connected to Discord via the token successfully.]'))
    console.log(chalk.blueBright('[Username: ' + bot.user.username +']'))
    console.log(chalk.blueBright('----------------------------------------------------------'))
})

bot.on('message', message => {
    if (config.showMessages){
        console.log(`${message.author.username}#${message.author.discriminator}: ${message.content}`);
    }
    if (config.channels == "all"){
        aloAndJoin(message);
    } else if (config.channels.includes(message.channel.id)){
        aloAndJoin(message);
    }
});

bot.login(config.monitoringtoken).catch(console.error);

function joinInvite(message){
    console.log(chalk.blueBright.bold("Possible Invite Found!"));
        var start = new Date();
        var inviteCode = message.content.split('.gg/')[1]; 
        console.log(chalk.blueBright(`Attempting to join server with invite code ${inviteCode}.`));

        request.post({url: `https://discord.com/api/v6/invites/${inviteCode}`, headers: {'Authorization': config.claimertoken}})
            .on('response', response => {
                var responseTime = new Date() - start; // calculates time took to join
                if (response.statusCode == 200){
                    console.log(chalk.green(`Invite Joiner Success! Joined server with invite code ${inviteCode} in ${responseTime} ms.`));
                    const embed = new Discord.RichEmbed()
                        .setTitle('Invite Joiner Success!')
                        .setColor('GREEN')
                        .addField('Invite Code', inviteCode, true)
                        .addField('Processing Time', `${responseTime} ms`, true)
                        .addField('Response Code', response.statusCode, true)
                        .addField('From Server', `||${message.guild.name}||`, true)
                        .addField('From Channel', `||${message.channel.name}||`, true)
                        .addField('From User', `||${message.author.username}#${message.author.discriminator}||`, true)
                        .addField('Account', `${bot.user.username}#${bot.user.discriminator}`, true);
                    webhook.send(embed);
                } else {
                    console.log(chalk.red(`Invite Joiner Failure! Failed to join server with invite code ${inviteCode}.`));
                    const embed = new Discord.RichEmbed()
                        .setTitle('Invite Joiner Fail!')
                        .setColor('RED')
                        .addField('Invite Code', inviteCode, true)
                        .addField('Processing Time', `${responseTime} ms`, true)
                        .addField('Response Code', response.statusCode, true)
                        .addField('From Server', `||${message.guild.name}||`, true)
                        .addField('From Channel', `||${message.channel.name}||`, true)
                        .addField('From User', `||${message.author.username}#${message.author.discriminator}||`, true)
                        .addField('Account', `${bot.user.username}#${bot.user.discriminator}`, true);
                        // try {
                        // request(`https://discord.com/api/v6/invites/${inviteCode}`, (error, body, response) => {
                        //     embed.addField('Server joined', JSON.parse(body.body).guild.name, false);
                        // });
                        // } catch (err) {
                        //     embed.addField('Server joined', 'n/a', false);
                        // }
                    webhook.send(embed);
                }
            });
}

function aloAndJoin(message){
    if (message.content.includes('discord.gg/')){
        joinInvite(message);
    }
    if (config.openLinks){
        for (word in message.content.split(" ")){
            if (message.content.split(" ")[word].includes("http")){
                if (!linkStorage.includes(message.content.split(" ")[word])){
                    open(message.content.split(" ")[word]);
                    linkStorage += message.content.split(" ")[word] + " ";
                }
            }
        }
    }
}

async function clearLinkStorage(){
    linkStorage = "";
}

setInterval(clearLinkStorage, config.linkReset * 1000)

