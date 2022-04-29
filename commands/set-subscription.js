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
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  data: {
    type: 1,
    name: "set-subscription",
    description: "set a subscription for someone",
    options: [
      {
        name: "member",
        description: "the one you will give him the subscription",
        required: true,
        type: 6,
      },
      {
        name: "time",
        description: "please type the time like this: 1m 10 30d",
        required: true,
        type: 3,
      },
      {
        name: "object",
        description: "the thing you will make the subscription for",
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
    if (!i.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return i.reply(
        'you don\'t have "MANAGE_GUILD" permission to use this command.'
      );
    let time = ms(i.options.getString("time", true));
    let user = i.options.getUser("member", true);
    let object = i.options.getString("object", true);
    if (!time) return;
    if (!user) return;
    if (!i.guild) return;
    let time2e = new Date().setTime(time);
    i.reply({
      content:
        "subscription has add" +
        ` for ${user.tag} in ${i.guild.name} | object: "${object}", time: "${ms(
          time2e
        )}"`,
    });
    if ((await db.fetch(`SUBS`)) == null)
      return await db.set(`SUBS`, [
        {
          guild: i.guild.id,
          author: i.user.id,
          time: time,
          date: new Date().getTime(),
          ctd: new Date().getTime() + time,
          member: user.id,
          object: object,
        },
      ]);
    await db.push(`SUBS`, {
      guild: i.guild.id,
      author: i.user.id,
      time: time,
      date: new Date().getTime(),
      ctd: new Date().getTime() + new Date().setTime(time),
      member: user.id,
      object: object,
    });
  },
};
