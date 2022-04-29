// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|

// did you see casperMusic? chack out: https://discord.gg/ws9jA2cR5s

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

const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const db = require("quick.db");

const commands = new Map();
const client = new Discord.Client({
  allowedMentions: {
    repliedUser: false,
  },
  intents: new Discord.Intents(32767),
  presence: {
    activities: [{ name: "subscription bot by def", type: "COMPETING" }],
    status: "dnd",
  },
});

fs.readdirSync(__dirname + "/commands/", { encoding: "utf-8" })
  .filter((file) => file.endsWith(".js"))
  .map((file) => {
    let command = require(__dirname + "/commands/" + file);
    commands.set(command?.data?.name, command);
  });

client.on("ready", async () => {
  let commandsD = [];
  await commands.forEach(async (cmd) => {
    await commandsD.push(cmd.data);
    console.log(commandsD);
  });
  await client.application.commands.set(commandsD);
  await setInterval(async () => {
    await checkTimes(client);
  }, 5000);
});

/**
 *
 * @param {Discord.Client} client
 */
async function checkTimes(client) {
  let times = await db.fetch(`SUBS`);
  if (times == null) return;
  times.forEach(async (vale) => {
    let realTime = new Date().getTime();
    let con = realTime > vale.ctd;
    if (con == true) {
      await deleteD(vale);
      let author = client.users.cache.get(vale.author);
      let member = client.users.cache.get(vale.member);
      if (!author) return;
      if (!member) return;
      let logsChannel = await db.fetch(`LOGS_${vale.guild}`);
      if (logsChannel !== null) {
        let cha = await client.channels.cache.get(logsChannel);
        if (cha)
          cha
            ?.send(
              `Hay members :wave:,\n **${member.tag}** subscription for **${
                vale.object
              }** has been end || time: **${ms(vale.time)}** | owner: **${
                author.tag
              }**`
            )
            .catch(() => {});
      }
      author
        .send({
          content: `Hay :wave:\nyour subscription for **${
            member.tag
          }** has end!.\nthe object you make subscription for is **${
            vale.object
          }**\nData: object: ${vale.object} | author: ${
            vale.author
          } | member: ${vale.member} | time: ${ms(vale.time)} | date: ${
            vale.date
          }\n\nthank your for using Def projects :hearts:`,
        })
        .catch(() => {});
      member
        .send({
          content: `Hay :wave:\nyour subscription for **${
            vale.object
          }** has end!.\nsubscription owner is **${
            member.tag
          }**\nData: object: ${vale.object} | author: ${
            vale.author
          } | member: ${vale.member} | time: ${ms(vale.time)} | date: ${
            vale.date
          }\n\nthank your for using Def projects :hearts:`,
        })
        .catch(() => {});
    }
  });
}

async function deleteD(vale) {
  let times = await db.fetch(`SUBS`);
  let neD = [];
  await times.forEach(async (va) => {
    if (
      va.guild == vale.guild &&
      va.author == vale.author &&
      va.time == vale.time &&
      va.date == vale.date &&
      va.ctd == vale.ctd &&
      va.object == vale.object
    )
      return;
    await neD.push(va);
  });
  await db.set(`SUBS`, neD);
}

client.on("interactionCreate", async (i) => {
  if (!i.guild?.id) return "def";
  if (!i.isCommand()) return;
  let cmd = commands.get(i.commandName);
  if (cmd) cmd.run(client, i);
});

client.login(fs.readFileSync(__dirname + "/token.def", { encoding: "utf-8" }));
