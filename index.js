const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const Config = require("./config.json");
const Token = require("./token.json");
const moment = require('moment'); 
const fs = require("fs");
const db = require('quick.db');
const economy = new db.table('economy');
var profanities = require('profanities')  //We need to require  all of four packages after we install them.
const dl = require('discord-leveling');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');


client.on('ready', () => {
    console.log(`${client.user.username} It started senpai and is running on ${client.guilds.size} servers!.`) 


//Second let's call the file we just made using fs.
var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8'); //We need to call the file , we can just copy and paste it here. We need to edit it a little.
client.commands = new Discord.Collection();

function loadCmds () {
fs.readdir('./commands/', (err, files) => {  //This reads the directory of the commands folder
if (err) console.error(err); //This sends a message if it gets an error calling the commands

var jsfiles = files.filter(f => f.split('.').pop() === 'js'); //This checks if the file extension is 'js'
if (jsfiles.length <= 0) { return console.log('Senpai I didn\'t found those commands. ;-;')} //This returns and sends to the console that no commands where found in the folder
else { console.log(jsfiles.length + ' commands found.') } //This tells how many commands found

jsfiles.forEach((f, i) => { //This, loops through  each file and runs the following code.
    delete require.cache[require.resolve(`./commands/${f}`)] //Deletes the cached file you specify
var cmds = require(`./commands/${f}`); 
console.log(`Command ${f} is loading...`); 
client.commands.set(cmds.config.command, cmds); 

})

})

}


loadCmds();
//Listener Event: Message Received (This will run every time a message is received)
client.on('message', message => {
    let uuid = `${message.guild.id}-${message.author.id}`;
let getEco = economy.fetch(uuid);
if (!getEco) {
    economy.set(uuid, {lastDaily: 0, money: 2500});
}

//Message Events 

// Message event

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('I got disconnected, I will reconnect now.'));

client.on('reconnecting', () => console.log('I am reconnecting now.'));

client.on('message', msg => {

});







//Variables
var sender = message.author; //The person who send the message
var msg = message.content.toUpperCase(); //Takes the message, and makes it all uppercase
var prefix = ">" //You can set this to whatever prefix you want
var cont = message.content.slice(prefix.length).split(" "); //This slices off the prefix, then puts it on a array
var args = cont.slice(1); //This is everything after the command is an array.

//Events
if (client.user.id === message.author.id) { return } //This closes the script if the bot sends the message so that the bot can't have an account


if (!message.content.startsWith(prefix)) return; //This returns if the prefix of the command is not the one set 

var cmd = client.commands.get(cont[0]) //This tries to grab the command you called on chat
if (cmd) cmd.run(client, message, args, db, economy);

//First, we need to make sure that it isn't reading a message, that the bot is sending
if (sender.id === '586987767314120728') { //Checks if the ID of the sender is the same ID as the bot
return; //Cancels the rest of the Listener Event
} 
 
});



//status
client.user.setStatus('online') //Your status goes here; It can be 'Online', 'Idle', 'Invisible', 'dnd'

//game and streaming
client.user.setGame(' Resting.') //You can change the string to whatever you want it to say.
//To add a stream add another option like this:
 //It has to be a twich link to stream.

});

//Listener Event: User joining the discord server.
client.on('guildMemberAdd', member => {

    console.log('Senpai the user ' + member.user.username + ' has joined the server.') //Sends a message in console that someone has joined the discord server

//Now, lets add a role when they join. First we need the role we want
var role = member.guild.roles.find('name', 'Initiate'); //This looks for the role in the server guild, it searches the name, meaning you can change 'User' with the role you want

//Secondary we will add the role
member.addRole(role);

//Sending a message when a user joins discord.
member.guild.channels.get('546396518773555210').send('**' + member.user.username + '**, has arrived in the server!'); //The first part gets the channel, the second part sends a message


});

//Now let's make it so that when someone leaves, code runs.
//Listener Event: User leaves discord server.
client.on('guildMemberRemove', member => {

//The code can be simply copied from the line you made before.
member.guild.channels.get('546401098131308583').send('**' + member.user.username + '**, has left ther server. ;-;');
//You can choose whatever ID channel you want and whatever text you want


});


client.login(Token.token);