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

const { Client, CommandInteraction } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  data: {
    type: 1,
    name: "all-subscriptions",
    description: "view all subscriptions",
  },

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} i
   */

  run: async (client, i) => {
    let yours = [];
    let forYou = [];

    let data = await db.fetch(`SUBS`);
    if (data == null) return i.reply("there is not data in the bot.");
    await data.forEach(async (vale) => {
      if (vale.member == i.user.id) await forYou.push(vale);
      else if (vale.author == i.user.id) await yours.push(vale);
    });
    let YoursMessage = await yours
      .map(
        (vale, index) =>
          `${index + 1}. **${vale.object}** for **${
            client.users.cache.get(vale.member)
              ? client.users.cache.get(vale.member)?.tag
              : vale.member
          }** | time: \`${ms(vale.time)}\``
      )
      .join("\n");
    let forYouMessage = await forYou
      .map(
        (vale, index) =>
          `${index + 1}. **${vale.object}** from **${
            client.users.cache.get(vale.author)
              ? client.users.cache.get(vale.author)?.tag
              : vale.member
          }** | time: \`${ms(vale.time)}\``
      )
      .join("\n");
    i.reply({
      content:
        "> ` - ` subscriptions you made:\n" +
        YoursMessage +
        "\nsubscriptions you have:\n" +
        forYouMessage,
      ephemeral: true,
    });
  },
};
