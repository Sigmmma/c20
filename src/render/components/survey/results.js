const {html, heading, slugify} = require("../bits");

const resultsByIp = require("./survey-results.json");
//delete test data:
delete resultsByIp["f1f40a204f64131024d7d4bd7db0bb28"];
delete resultsByIp["837ec5754f503cfaaee0929fd48974e7"];
const results = Object.values(resultsByIp);

const experience = (id, title) => {
  return html`
    <fieldset>
      <legend>${title}</legend>
      <div class="radio-options">
        <div class="radio-option">
          <input type="radio" id="${id + "-0"}" name="${id}" value="unknown">
          <label for="${id + "-0"}">What's that?</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-1"}" name="${id}" value="uninterested">
          <label for="${id + "-1"}">Uninterested for now</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-2"}" name="${id}" value="curious">
          <label for="${id + "-2"}">Curious about</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-3"}" name="${id}" value="need-help">
          <label for="${id + "-3"}">I would like more info</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-4"}" name="${id}" value="easy">
          <label for="${id + "-4"}">I know how to do this</label>
        </div>
      </div>
    </fieldset>
  `;
};

const renderResultTable = (opts, total, title) => html`
  <strong>${title}</strong>
  <table>
    <thead>
      <tr>
        <th>Option</th>
        <th width="10%">Count</th>
        <th width="20%">Percent</th>
      </tr>
    </thead>
    ${opts.map(({label, count}) => html`
      <tr>
        <td>${label}</td>
        <td>${count}</td>
        <td><meter min="0" max="${total}" value="${count}">${count}</meter></td>
      </tr>
    `)}
  </table>
`;

const pickOneTable = (id, title, opts, unsorted) => {
  let total = 0;
  for (const opt of opts) {
    const numOpt = results.filter(r => r[id] == opt.id).length;
    opt.count = numOpt;
    total += numOpt;
  }
  if (!unsorted) {
    opts.sort((a, b) => b.count - a.count);
  }
  return renderResultTable(opts, total, title);
};

const pickAnyTable = (id, title, opts, unsorted) => {
  let total = 0;
  for (const opt of opts) {
    const optIdJoined = id + "-" + opt.id;
    const numOpt = results.filter(r => r[optIdJoined] == "on").length;
    opt.count = numOpt;
    total += numOpt;
  }
  if (!unsorted) {
    opts.sort((a, b) => b.count - a.count);
  }
  return renderResultTable(opts, total, title);
};

const globalExpCountsByQuestion = {
  ["unknown"]: {},
  ["uninterested"]: {},
  ["curious"]: {},
  ["need-help"]: {},
  ["easy"]: {},
};

const experienceTable = (questions) => {
  return html`
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>What's that?</th>
          <th>Uninterested for now</th>
          <th>Curious about</th>
          <th>I would like more info</th>
          <th>I know how to do this</th>
        </tr>
      </thead>
      <tbody>
        ${questions.map(({id, label}) => {
          let total = 0;
          const expCounts = {
            ["unknown"]: 0,
            ["uninterested"]: 0,
            ["curious"]: 0,
            ["need-help"]: 0,
            ["easy"]: 0,
          };
          for (const expType of Object.keys(expCounts)) {
            const numOpt = results.filter(r => r[id] == expType).length;
            expCounts[expType] = numOpt;
            total += numOpt;
            globalExpCountsByQuestion[expType][id] = {count: numOpt, label};
          }
          return html`
            <tr>
              <td width="20%">${label}</td>
              <td width="16%">
                <meter min="0" max="${total}" value="${expCounts["unknown"]}">${expCounts["unknown"]}</meter>
                <br><small>${expCounts["unknown"]}</small>
              </td>
              <td width="16%">
                <meter min="0" max="${total}" value="${expCounts["uninterested"]}">${expCounts["uninterested"]}</meter>
                <br><small>${expCounts["uninterested"]}</small>
              </td>
              <td width="16%">
                <meter min="0" max="${total}" value="${expCounts["curious"]}">${expCounts["curious"]}</meter>
                <br><small>${expCounts["curious"]}</small>
              </td>
              <td width="16%">
                <meter min="0" max="${total}" value="${expCounts["need-help"]}">${expCounts["need-help"]}</meter>
                <br><small>${expCounts["need-help"]}</small>
              </td>
              <td width="16%">
                <meter min="0" max="${total}" value="${expCounts["easy"]}">${expCounts["easy"]}</meter>
                <br><small>${expCounts["easy"]}</small>
              </td>
            </tr>
          `;
        })}
      </tbody>
    </table>
  `;
};

const topExpChoices = (num, expType) => {
  const questions = Object.values(globalExpCountsByQuestion[expType]);
  questions.sort((a, b) => b.count - a.count);
  return html`
    <ol>
      ${questions.slice(0, num).map(({label, count}) => html`
        <li>${label} (${count})</li>
      `)}
    </ol>
  `;
};

const headings = [];

const section = (level, title) => {
  headings.push({title, id: slugify(title), level});
  return heading("h" + level, title);
};

const body = html`
  ${section(1, "Intro")}
  ${pickOneTable("years", "How many years have you been modding Halo?", [
    {id: "", label: "1 or less"},
    {id: "2-3", label: "2-3 years"},
    {id: "4-6", label: "4-6 years"},
    {id: "7-10", label: "7-10 years"},
    {id: "11-plus", label: "11+ years"},
  ], true)}

  ${pickAnyTable("os", "What operating system(s) do you use for modding?", [
    {id: "windows", label: "Windows"},
    {id: "linux", label: "Linux"},
    {id: "mac", label: "Mac"},
  ])}

  ${pickAnyTable("activities", "What types of activities do you partake in?", [
    {id: "modeling", label: "Modeling"},
    {id: "texturing", label: "Texturing"},
    {id: "animating", label: "Animating"},
    {id: "documentation", label: "Documentation or educational content (e.g. tutorials, YouTube videos)"},
    {id: "community", label: "Community building (e.g. running or moderating community groups, organizing events)"},
    {id: "gameplay", label: "Streaming and gameplay videos, montages"},
    {id: "hosting", label: "Server hosting"},
    {id: "audio", label: "Music or sound effects"},
    {id: "tags", label: "Tag editing"},
    {id: "maps", label: "Custom maps"},
    {id: "halo-scripting", label: "Halo scripting"},
    {id: "lua-scripting", label: "Lua scripting"},
    {id: "software-tools", label: "Software and tools development"},
  ])}

  ${pickAnyTable("games", "What Halo games are you interested in modding?", [
    {id: "h1x", label: "Halo 1 Xbox"},
    {id: "h1pc", label: "Halo 1 PC (Retail)"},
    {id: "h1ce", label: "Halo 1 Custom Edition"},
    {id: "h1mcc", label: "Halo 1 MCC"},
    {id: "h2v", label: "Halo 2 Vista/Project Cartographer"},
    {id: "h2mcc", label: "Halo 2 MCC"},
    {id: "h3mcc", label: "Halo 3 MCC"},
    {id: "hrmcc", label: "Halo Reach MCC"},
  ])}

  ${section(1, "General software")}
  ${section(2, "3D asset creation")}
  ${experienceTable([
    {id: "3d-blender", label: "Using Blender"},
    {id: "3d-3dsmax", label: "Using 3ds Max"},
    {id: "3d-maya", label: "Using Maya"},
    {id: "3d-uv-unwrapping", label: "UV unwrapping (any software)"},
    {id: "3d-porting", label: "Porting models from other Halo games to H1"},
  ])}

  ${section(2, "2D asset creation")}
  ${experienceTable([
    {id: "2d-photoshop", label: "Using Photoshop"},
    {id: "2d-gimp", label: "Using GIMP"},
    {id: "2d-krita", label: "Using Krita"},
    {id: "2d-paint-net", label: "Using Paint.NET"},
    {id: "2d-alpha", label: "Alpha channels"},
    {id: "2d-porting", label: "Porting bitmaps from other Halo games to H1"},
  ])}

  ${section(2, "Other software")}
  ${experienceTable([
    {id: "soft-vcs", label: "Version control (e.g. git, subversion)"},
    {id: "soft-audio", label: "Audio editing/DAWs (e.g. Audacity, Reaper)"},
  ])}

  ${section(1, "Halo toolkits and mods")}
  ${experienceTable([
    {id: "tools-hek", label: "HEK - Halo Editing Kit"},
    {id: "tools-opensauce", label: "OpenSauce"},
    {id: "tools-mek", label: "MEK - Mozz Editing Kit"},
    {id: "tools-invader", label: "Invader"},
    {id: "tools-hac2", label: "HAC2, Optic"},
    {id: "tools-chimera", label: "Chimera, lua scripting"},
  ])}

  ${section(1, "Tags")}
  ${section(2, "General tags")}
  ${experienceTable([
    {id: "tags-guerilla", label: "Editing tags with Guerilla/OS_Guerilla"},
    {id: "tags-invader", label: "Editing tags with invader-edit-qt"},
    {id: "tags-mozz", label: "Editing tags with Mozzarilla"},
    {id: "tags-realtime", label: "Real-time tag editing"},
    {id: "tags-extracting", label: "Extracting tags"},
    {id: "tags-sharing", label: "Sharing and releasing tags"},
    {id: "tags-finding", label: "Finding publicly-shared tags"},
    {id: "tags-organizing", label: "Organizing the tags directory"},
  ])}

  ${section(2, "Shaders and bitmaps")}
  ${experienceTable([
    {id: "bitm-compiling", label: "Compiling bitmaps"},
    {id: "bitm-compression", label: "Bitmap compression"},
    {id: "bitm-cubemaps", label: "Cubemaps"},
    {id: "bitm-multipurpose", label: "Multipurpose bitmaps"},
    {id: "bitm-detail", label: "Detail maps"},
    {id: "shdr-anim", label: "Texture animation"},
    {id: "shdr-colour", label: "Colour change (e.g. armour)"},
    {id: "shdr-lensflare", label: "Shader lens flares"},
    {id: "shdr-model", label: "Model shaders"},
    {id: "shdr-env", label: "Environment shaders"},
    {id: "shdr-chicago", label: "Chicago/extended shaders"},
    {id: "shdr-plasma", label: "Plasma shaders"},
    {id: "shdr-glass", label: "Glass shaders"},
    {id: "shdr-water", label: "Water shaders"},
    {id: "shdr-meter", label: "Meter shaders"},
  ])}

  ${section(2, "Other tags and concepts")}
  ${experienceTable([
    {id: "tags-hud", label: "Custom HUD elements"},
    {id: "tags-fonts", label: "Custom fonts"},
    {id: "tags-strings", label: "Strings (e.g. cinematic titles, pickup messages)"},
    {id: "tags-funcs", label: "Functions (e.g. \"A in\", \"C out\")"},
    {id: "tags-proj-contr", label: "Projectiles and contrails"},
    {id: "tags-effects", label: "Effects"},
    {id: "tags-particles-pphys", label: "Particles and point physics"},
    {id: "tags-glow-lightn", label: "Glow and lightning tags"},
  ])}

  ${section(2, "Objects and items")}
  ${experienceTable([
    {id: "obj-device", label: "Device machines, light fixures, and controls"},
    {id: "obj-scenery", label: "Custom scenery"},
    {id: "obj-regions", label: "Model regions"},
    {id: "obj-extraction", label: "Extracting models for modification"},
    {id: "obj-collision", label: "Collision models"},
    {id: "obj-widgets", label: "Widget attachments (e.g. lights, antennas"},
    {id: "obj-markers-nodes", label: "Markers and nodes"},
    {id: "obj-anim-types", label: "Animation types (overlay, replacement, etc)"},
    {id: "obj-physics", label: "Vehicle physics"},
    {id: "obj-vehicles", label: "Vehicles and seats"},
    {id: "obj-riders", label: "Rider animations"},
    {id: "obj-bipeds", label: "Custom bipeds"},
    {id: "obj-3p-anim", label: "3rd person animations"},
    {id: "obj-weapons", label: "Custom weapons"},
    {id: "obj-1p-anim", label: "First person animations"},
    {id: "obj-equipment", label: "Custom equipment"},
  ])}

  ${section(1, "Map-making")}
  ${section(2, "General map-making")}
  ${experienceTable([
    {id: "map-modeling", label: "BSP modeling"},
    {id: "map-materials", label: "Materials and material flags"},
    {id: "map-lighting", label: "Lighting and lightmaps"},
    {id: "map-portals", label: "Portals"},
    {id: "map-fog", label: "Fog planes"},
    {id: "map-weather-vol", label: "Weather polyhedra/volumes"},
    {id: "map-sapien", label: "Using Sapien"},
    {id: "map-sound-env", label: "Sound environments"},
    {id: "map-weather-wind", label: "Weather and wind"},
    {id: "map-scenery", label: "Scenery and sound scenery placement"},
    {id: "map-detail-decals", label: "Detail objects and decals"},
    {id: "map-ui", label: "Custom UI maps"},
    {id: "map-resource", label: "Custom resource maps"},
    {id: "map-skyboxes", label: "Custom skyboxes"},
    {id: "map-bsp-extraction", label: "Extracting BSPs for modification"},
  ])}

  ${section(2, "Multiplayer maps")}
  ${experienceTable([
    {id: "mp-netgame", label: "Netgame flags and multiplayer setup"},
    {id: "mp-balancing", label: "Multiplayer balancing strategies"},
    {id: "mp-sync-hacks", label: "Netcode sync workarounds (e.g. biped crushers)"},
  ])}

  ${section(2, "Singleplayer maps")}
  ${experienceTable([
    {id: "sp-scripting", label: "Scripting"},
    {id: "sp-cinematics", label: "Cinematics"},
    {id: "sp-dialogue", label: "Dialogue"},
    {id: "sp-recorded-anim", label: "Recorded animations"},
    {id: "sp-device-groups", label: "Device control groups"},
    {id: "sp-encounters", label: "AI and encounter setup"},
    {id: "sp-balancing", label: "AI behaviour and balancing strategies"},
  ])}

  ${section(1, "Servers")}
  ${experienceTable([
    {id: "servers-hosting", label: "Hosting dedicated servers"},
    {id: "servers-mods", label: "Server mods (e.g. SAPP)"},
    {id: "servers-commands", label: "Console commands and rcon"},
  ])}

  ${section(1, "Programming and reverse engineering")}
  ${experienceTable([
    {id: "prog-hook", label: "Hooking/patching game code"},
    {id: "prog-tags", label: "Programmatically editing or creating tags with Reclaimer"},
    {id: "prog-cheat-engine", label: "Using Cheat Engine"},
    {id: "prog-engine", label: "How Halo's engine works (e.g. tag tables, game state)"},
  ])}

  ${section(1, "Conclusions")}
  ${section(2, "Top 30 desired topics")}
  ${topExpChoices(30, "need-help")}
  ${section(2, "Top 15 curiosities")}
  ${topExpChoices(15, "curious")}
  ${section(2, "Top 10 unknown topics")}
  ${topExpChoices(10, "unknown")}
  ${section(2, "Top 10 best understood")}
  ${topExpChoices(10, "easy")}
`;

module.exports = {headings, body};
