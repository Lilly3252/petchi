//THIS IS AI GENERATED AND I DONT GIVE A FREAKING DAMN

const fs = require("fs");
const path = require("path");

const commandsDir = path.join(__dirname, "dist/slashyInformations");
const readmePath = path.join(__dirname, "README.md");
const placeholder = "<!-- COMMANDS_TABLE -->";
const excludeFolders = ["autocomplete"]; // if having a folder that needs to be ommited , there it goes

function getCommandFiles(dir) {
  let files = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludeFolders.includes(file)) {
        files = files.concat(getCommandFiles(fullPath));
      }
    } else if (file.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractCommands(mod) {
  const commands = [];

  // Named exports
  for (const key of Object.keys(mod)) {
    const cmd = mod[key];
    if (cmd && typeof cmd === "object" && cmd.name && cmd.description) {
      commands.push({ name: cmd.name, description: cmd.description });
    }
  }

  // If default export contains commands
  if (mod.default && typeof mod.default === "object") {
    for (const key of Object.keys(mod.default)) {
      const cmd = mod.default[key];
      if (cmd && typeof cmd === "object" && cmd.name && cmd.description) {
        commands.push({ name: cmd.name, description: cmd.description });
      }
    }
  }

  return commands;
}

function getAllCommands() {
  const files = getCommandFiles(commandsDir);
  let commands = [];

  for (const file of files) {
    try {
      const mod = require(file);
      commands = commands.concat(extractCommands(mod));
    } catch (err) {
      console.error(`Failed to load ${file}:`, err.message);
    }
  }

  // Deduplicate by name
  const seen = new Set();
  commands = commands.filter(cmd => {
    if (seen.has(cmd.name)) return false;
    seen.add(cmd.name);
    return true;
  });

  // Sort alphabetically
  commands.sort((a, b) => a.name.localeCompare(b.name));
  return commands;
}


function generateTable(commands) {
  let table = "| Command | Description |\n|---------|-------------|\n";
  for (const cmd of commands) {
    table += `| \`${cmd.name}\` | ${cmd.description} |\n`;
  }
  return table;
}

function updateReadme() {
  const commands = getAllCommands();
  const table = generateTable(commands);

  let readme = fs.readFileSync(readmePath, "utf8");
  if (!readme.includes(placeholder)) {
    console.error(`Placeholder ${placeholder} not found in README.md`);
    process.exit(1);
  }

  const regex = new RegExp(`${placeholder}[\\s\\S]*${placeholder}`);
  const updated = readme.replace(regex, `${placeholder}\n\n${table}\n${placeholder}`);
  fs.writeFileSync(readmePath, updated, "utf8");
  console.log("✅ README.md updated with commands table!");
}

updateReadme();
