/**
   ⚠️ stop right there ⚠️
   did you know you are stealing my project when you remove the copyright?
   you can just contact me http://discord.com/users/933856726770413578 for publish it
   or if you are using it for your server know the no one will see the copyrights only you in the project
   so why you are removing it?, be nice and just leave it
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
 */

const { Client, CommandInteraction, Permissions } = require("discord.js");
const db = require("quick.db");

module.exports = {
  data: {
    type: 1,
    name: "set-guild-subscriptions-logs",
    description: "set logs for subscriptions in your server",
    options: [
      {
        name: "channel",
        description: "the channel will store the logs",
        required: true,
        type: 7,
      },
    ],
  },

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} i
   */

  run: async (client, i) => {
    if (!i.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
      return i.reply(
        'you don\'t have "MANAGE_CHANNELS" permission to use this command.'
      );
    let channel = i.options.getChannel("channel", true);
    if (channel.id !== (await db.fetch(`LOGS_${i.guild.id}`)))
      await db.set(`LOGS_${i.guild.id}`, channel.id);
    else {
      await db.set(`LOGS_${i.guild.id}`, null);
      channel.id = "removed";
    }
    i.reply(`subscriptions logs channel has changed to: "<#${channel.id}>"`);
  },
};
