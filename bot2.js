const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const token = 'YOUR_BOT_TOKEN'; // Replace with your bot token

// IDs for the categories
const CATEGORY_1_ID = 'CATEGORY_1_ID'; // Replace with Category 1 ID
const CATEGORY_2_ID = 'CATEGORY_2_ID'; // Replace with Category 2 ID
const ROLE_A_ID = 'ROLE_A_ID'; // Replace with Role A ID
const ROLE_B_ID = 'ROLE_B_ID'; // Replace with Role B ID

// Object to track whether a channel's first message has been processed
let firstMessageHandled = {};

// When the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore bot messages

    const channel = message.channel;

    // Check if the first message in the channel has been processed
    if (!firstMessageHandled[channel.id]) {
        firstMessageHandled[channel.id] = true; // Mark this channel as processed

        const member = message.member;

        // Check the member's roles and move the channel accordingly
        if (member.roles.cache.has(ROLE_A_ID)) {
            // Move to Category 1
            channel.setParent(CATEGORY_1_ID)
                .then(() => {
                    console.log(`Channel moved to Category 1 based on ${member.displayName}'s role`);
                })
                .catch(console.error);
        } else if (member.roles.cache.has(ROLE_B_ID)) {
            // Move to Category 2
            channel.setParent(CATEGORY_2_ID)
                .then(() => {
                    console.log(`Channel moved to Category 2 based on ${member.displayName}'s role`);
                })
                .catch(console.error);
        }
    }
});

// Log in to Discord with your bot token
client.login(token);
