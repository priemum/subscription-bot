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
    name: "time-left",
    description: "view subscriptions left time",
    options: [
      {
        name: "guild_id",
        description: "the guild id you made the subscription in",
        required: true,
        type: 3,
      },
      {
        name: "object",
        description: "the object you made the subscription for",
        required: true,
        type: 3,
      },
      {
        name: "owner_id",
        description:
          "the id of subscription owner (the person who set the subscription)",
        required: true,
        type: 3,
      },
    ],
  },

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} i
   */

  run: async (client, i) => {
    let subs = [];
    let data = await db.fetch(`SUBS`);
    if (data == null) return i.reply("there is not data in the bot.");
    await data.forEach(async (vale) => {
      if (
        vale.author == (await getValue(i, "owner_id")) &&
        vale.object == (await getValue(i, "object")) &&
        vale.guild == (await getValue(i, "guild_id"))
      )
        await subs.push(vale);
    });
    setTimeout(async () => {
      let message = await subs
        .map(
          (vale, index) =>
            `${index + 1}. ${vale.object} | time: \`${ms(
              vale.time
            )}\` | left: ${ms(new Date().getTime() - vale.ctd)}`
        )
        .join("\n");
      await i.reply({
        content:
          message == "" || message == " " || message == "\n"
            ? "no data found!."
            : message + "_ _",
        ephemeral: true,
      });
    }, 1235);
  },
};

/**
 *
 * @param {CommandInteraction} i
 * @param {string} value
 *
 * @returns {string}
 */

async function getValue(i, value) {
  return i.options.getString(value);
}
