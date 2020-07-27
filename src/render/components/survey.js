const {html, heading, slugify} = require("./bits");

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

const checkAny = (id, title, opts) => {
  return html`
    <fieldset>
      <legend>${title} <small><em>(Check all that apply)</em></small></legend>
      ${opts.map(({label, id: optId}) => {
        const optIdJoined = id + "-" + optId;
        return html`
          <input type="checkbox" id="${optIdJoined}" name="${optIdJoined}">
          <label for="${optIdJoined}">${label}</label>
          <br>
        `;
      })}
    </fieldset>
  `;
};

const headings = [];

const section = (level, title) => {
  headings.push({title, id: slugify(title), level});
  return heading("h" + level, title);
};

const body = html`
  <form method="post" action="/survey/submit" enctype="multipart/form-data">

  ${section(1, "Intro")}

  <fieldset>
    <legend for="years">How many years have you been modding Halo?</legend>
    <select id="years" name="years">
      <option value="">--</option>
      <option value="">1 or less</option>
      <option value="2-3">2-3 years</option>
      <option value="4-6">4-6 years</option>
      <option value="7-10">7-10 years</option>
      <option value="11-plus">11+ years</option>
    </select>
  </fieldset>

  ${checkAny("os", "What operating system(s) do you use for modding?", [
    {id: "windows", label: "Windows"},
    {id: "linux", label: "Linux"},
    {id: "mac", label: "Mac"},
  ])}

  ${checkAny("activities", "What types of activities do you partake in?", [
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
  ])}

  ${checkAny("games", "What Halo games are you interested in modding?", [
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
  ${experience("3d-blender", "Using Blender")}
  ${experience("3d-3dsmax", "Using 3ds Max")}
  ${experience("3d-maya", "Using Maya")}
  ${experience("3d-uv-unwrapping", "UV unwrapping (any software)")}
  ${experience("3d-porting", "Porting models from other Halo games to H1")}

  ${section(2, "2D asset creation")}
  ${experience("2d-photoshop", "Using Photoshop")}
  ${experience("2d-gimp", "Using GIMP")}
  ${experience("2d-krita", "Using Krita")}
  ${experience("2d-paint-net", "Using Paint.NET")}
  ${experience("2d-alpha", "Alpha channels")}
  ${experience("2d-porting", "Porting bitmaps from other Halo games to H1")}

  ${section(2, "Other software")}
  ${experience("soft-vcs", "Version control (e.g. git, subversion)")}
  ${experience("soft-audio", "Audio editing/DAWs (e.g. Audacity, Reaper)")}

  ${section(1, "Halo toolkits and mods")}
  ${experience("tools-hek", "HEK - Halo Editing Kit")}
  ${experience("tools-opensauce", "OpenSauce")}
  ${experience("tools-mek", "MEK - Mozz Editing Kit")}
  ${experience("tools-invader", "Invader")}
  ${experience("tools-hac2", "HAC2, Optic")}
  ${experience("tools-chimera", "Chimera, lua scripting")}

  ${section(1, "Tags")}
  ${section(2, "General tags")}
  ${experience("tags-guerilla", "Editing tags with Guerilla/OS_Guerilla")}
  ${experience("tags-invader", "Editing tags with invader-edit-qt")}
  ${experience("tags-mozz", "Editing tags with Mozzarilla")}
  ${experience("tags-realtime", "Real-time tag editing")}
  ${experience("tags-extracting", "Extracting tags")}
  ${experience("tags-sharing", "Sharing and releasing tags")}
  ${experience("tags-finding", "Finding publicly-shared tags")}
  ${experience("tags-organizing", "Organizing the tags directory")}

  ${section(2, "Shaders and bitmaps")}
  ${experience("bitm-compiling", "Compiling bitmaps")}
  ${experience("bitm-compression", "Bitmap compression")}
  ${experience("bitm-cubemaps", "Cubemaps")}
  ${experience("bitm-multipurpose", "Multipurpose bitmaps")}
  ${experience("bitm-detail", "Detail maps")}
  ${experience("shdr-anim", "Texture animation")}
  ${experience("shdr-colour", "Colour change (e.g. armour)")}
  ${experience("shdr-lensflare", "Shader lens flares")}
  ${experience("shdr-model", "Model shaders")}
  ${experience("shdr-env", "Environment shaders")}
  ${experience("shdr-chicago", "Chicago/extended shaders")}
  ${experience("shdr-plasma", "Plasma shaders")}
  ${experience("shdr-glass", "Glass shaders")}
  ${experience("shdr-water", "Water shaders")}
  ${experience("shdr-meter", "Meter shaders")}

  ${section(2, "Other tags and concepts")}
  ${experience("tags-hud", "Custom HUD elements")}
  ${experience("tags-fonts", "Custom fonts")}
  ${experience("tags-strings", "Strings (e.g. cinematic titles, pickup messages)")}
  ${experience("tags-funcs", "Functions (e.g. \"A in\", \"C out\")")}
  ${experience("tags-proj-contr", "Projectiles and contrails")}
  ${experience("tags-effects", "Effects")}
  ${experience("tags-particles-pphys", "Particles and point physics")}
  ${experience("tags-glow-lightn", "Glow and lightning tags")}

  ${section(2, "Objects and items")}
  ${experience("obj-device", "Device machines, light fixures, and controls")}
  ${experience("obj-scenery", "Custom scenery")}
  ${experience("obj-regions", "Model regions")}
  ${experience("obj-extraction", "Extracting models for modification")}
  ${experience("obj-collision", "Collision models")}
  ${experience("obj-widgets", "Widget attachments (e.g. lights, antennas")}
  ${experience("obj-markers-nodes", "Markers and nodes")}
  ${experience("obj-anim-types", "Animation types (overlay, replacement, etc)")}
  ${experience("obj-physics", "Vehicle physics")}
  ${experience("obj-vehicles", "Vehicles and seats")}
  ${experience("obj-riders", "Rider animations")}
  ${experience("obj-bipeds", "Custom bipeds")}
  ${experience("obj-3p-anim", "3rd person animations")}
  ${experience("obj-weapons", "Custom weapons")}
  ${experience("obj-1p-anim", "First person animations")}
  ${experience("obj-equipment", "Custom equipment")}

  ${section(1, "Map-making")}
  ${section(2, "General map-making")}
  ${experience("map-modeling", "BSP modeling")}
  ${experience("map-materials", "Materials and material flags")}
  ${experience("map-lighting", "Lighting and lightmaps")}
  ${experience("map-portals", "Portals")}
  ${experience("map-fog", "Fog planes")}
  ${experience("map-weather-vol", "Weather polyhedra/volumes")}
  ${experience("map-sapien", "Using Sapien")}
  ${experience("map-sound-env", "Sound environments")}
  ${experience("map-weather-wind", "Weather and wind")}
  ${experience("map-scenery", "Scenery and sound scenery placement")}
  ${experience("map-detail-decals", "Detail objects and decals")}
  ${experience("map-ui", "Custom UI maps")}
  ${experience("map-resource", "Custom resource maps")}
  ${experience("map-skyboxes", "Custom skyboxes")}
  ${experience("map-bsp-extraction", "Extracting BSPs for modification")}

  ${section(2, "Multiplayer maps")}
  ${experience("mp-netgame", "Netgame flags and multiplayer setup")}
  ${experience("mp-balancing", "Multiplayer balancing strategies")}
  ${experience("mp-sync-hacks", "Netcode sync workarounds (e.g. biped crushers)")}

  ${section(2, "Singleplayer maps")}
  ${experience("sp-scripting", "Scripting")}
  ${experience("sp-cinematics", "Cinematics")}
  ${experience("sp-dialogue", "Dialogue")}
  ${experience("sp-recorded-anim", "Recorded animations")}
  ${experience("sp-device-groups", "Device control groups")}
  ${experience("sp-encounters", "AI and encounter setup")}
  ${experience("sp-balancing", "AI behaviour and balancing strategies")}

  ${section(1, "Servers")}
  ${experience("servers-hosting", "Hosting dedicated servers")}
  ${experience("servers-mods", "Server mods (e.g. SAPP)")}
  ${experience("servers-commands", "Console commands and rcon")}

  ${section(1, "Programming and reverse engineering")}
  ${experience("prog-hook", "Hooking/patching game code")}
  ${experience("prog-tags", "Programmatically editing or creating tags with Reclaimer")}
  ${experience("prog-cheat-engine", "Using Cheat Engine")}
  ${experience("prog-engine", "How Halo's engine works (e.g. tag tables, game state)")}

  <hr>
  <p>Thanks for taking the time to fill out this survey! 💕 Results will be posted in Discord once the survey is complete.</p>
  <button type="submit">Submit and return to home</button>
  </form>
  <br>
`;

module.exports = {headings, body};
