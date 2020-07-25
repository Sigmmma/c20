const {html, heading, slugify} = require("./bits");

const experience = (title) => {
  const id = slugify(title);
  return html`
    <fieldset>
      <legend>${title}</legend>
      <div class="radio-options">
        <div class="radio-option">
          <input type="radio" id="${id + "-0"}" name="${id}">
          <label for="${id + "-0"}">Unknown</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-1"}" name="${id}">
          <label for="${id + "-1"}">Uninterested</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-2"}" name="${id}">
          <label for="${id + "-2"}">Interested</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-3"}" name="${id}">
          <label for="${id + "-3"}">Beginner</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-4"}" name="${id}">
          <label for="${id + "-4"}">Intermediate</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="${id + "-5"}" name="${id}">
          <label for="${id + "-5"}">Expert</label>
        </div>
      </div>
    </fieldset>
  `;
};

const checkAny = (title, opts) => {
  const id = slugify(title);
  return html`
    <fieldset>
      <legend>${title} <small><em>(Check all that apply)</em></small></legend>
      ${opts.map(opt => {
        const optId = id + "-" + slugify(opt);
        return html`
          <input type="checkbox" id="${optId}">
          <label for="${optId}">${opt}</label>
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
  ${checkAny("What operating system(s) do you use for modding?", [
    "Windows",
    "Linux",
    "Mac"
  ])}

  ${checkAny("What types of activities do you partake in?", [
    "Modeling",
    "Texturing",
    "Animating",
    "Documentation or educational content (e.g. tutorials, YouTube videos)",
    "Community building (e.g. running or moderating community groups, organizing events)",
    "Streaming and gameplay videos, montages",
    "Server hosting",
    "Music or sound effects",
    "Tag editing",
    "Custom maps",
  ])}

  ${checkAny("What Halo games are you interested in modding?", [
    "Halo 1 Xbox",
    "Halo 1 PC (Retail)",
    "Halo 1 Custom Edition",
    "Halo 1 MCC",
    "Halo 2 Vista/Project Cartographer",
    "Halo 2 MCC",
    "Halo 3 MCC",
  ])}

  ${section(1, "General software")}
  ${section(2, "3D asset creation")}
  ${experience("Using Blender")}
  ${experience("Using 3ds Max")}
  ${experience("Using Maya")}
  ${experience("UV unwrapping (any software)")}
  ${experience("Porting models from other Halo games to H1")}

  ${section(2, "2D asset creation")}
  ${experience("Using Photoshop")}
  ${experience("Using GIMP")}
  ${experience("Using Krita")}
  ${experience("Bits per channel")}
  ${experience("Alpha channels")}
  ${experience("Porting bitmaps from other Halo games to H1")}

  ${section(2, "Other software")}
  ${experience("Version control (e.g. git, subversion)")}
  ${experience("Audio editing/DAWs (e.g. Audacity, Reaper)")}

  ${section(1, "Halo toolkits and mods")}
  ${experience("HEK - Halo Editing Kit")}
  ${experience("OpenSauce")}
  ${experience("MEK - Mozz Editing Kit")}
  ${experience("Invader")}
  ${experience("HAC2, Optic")}
  ${experience("Chimera, lua scripting")}

  ${section(1, "Tags")}
  ${section(2, "General tags")}
  ${experience("Editing tags with Guerilla/OS_Guerilla")}
  ${experience("Editing tags with invader-edit-qt")}
  ${experience("Editing tags with Mozzarilla")}
  ${experience("Real-time tag editing")}
  ${experience("Extracting tags")}
  ${experience("Sharing and releasing tags")}
  ${experience("Finding publicly-shared tags")}
  ${experience("Organizing the tags directory")}

  ${section(2, "Shaders and bitmaps")}
  ${experience("Compiling bitmaps")}
  ${experience("Bitmap compression")}
  ${experience("Cubemaps")}
  ${experience("Multipurpose bitmaps")}
  ${experience("Detail maps")}
  ${experience("Texture animation")}
  ${experience("Colour change (e.g. armour)")}
  ${experience("Shader lens flares")}
  ${experience("Model shaders")}
  ${experience("Environment shaders")}
  ${experience("Chicago/extended shaders")}
  ${experience("Plasma shaders")}
  ${experience("Glass shaders")}
  ${experience("Water shaders")}
  ${experience("Meter shaders")}

  ${section(2, "Other tags and concepts")}
  ${experience("Custom HUD elements")}
  ${experience("Custom fonts")}
  ${experience("Strings (e.g. cinematic titles, pickup messages)")}
  ${experience("Functions (e.g. \"A in\", \"C out\")")}
  ${experience("Projectiles and contrails")}
  ${experience("Effects")}
  ${experience("Particles and point physics")}
  ${experience("Glow and lightning tags")}

  ${section(2, "Objects and items")}
  ${experience("Device machines, light fixures, and controls")}
  ${experience("Custom scenery")}
  ${experience("Model regions")}
  ${experience("Extracting models for modification")}
  ${experience("Collision models")}
  ${experience("Widget attachments (e.g. lights, antennas")}
  ${experience("Markers and nodes")}
  ${experience("Animation types (overlay, replacement, etc)")}
  ${experience("Vehicle physics")}
  ${experience("Vehicles and seats")}
  ${experience("Rider animations")}
  ${experience("Custom bipeds")}
  ${experience("3rd person animations")}
  ${experience("Custom weapons")}
  ${experience("First person animations")}
  ${experience("Custom equipment")}

  ${section(1, "Map-making")}
  ${section(2, "General map-making")}
  ${experience("BSP modeling")}
  ${experience("Material flags")}
  ${experience("Lighting and lightmaps")}
  ${experience("Portals")}
  ${experience("Fog planes")}
  ${experience("Weather polyhedra/volumes")}
  ${experience("Sapien")}
  ${experience("Sound environments")}
  ${experience("Weather and wind")}
  ${experience("Scenery and sound scenery placement")}
  ${experience("Detail objects and decals")}
  ${experience("Custom UI maps")}
  ${experience("Custom resource maps")}
  ${experience("Custom skyboxes")}
  ${experience("Extracting BSPs for modification")}

  ${section(2, "Multiplayer maps")}
  ${experience("Netgame flags and multiplayer setup")}
  ${experience("Multiplayer balancing strategies")}
  ${experience("Netcode sync workarounds (e.g. biped crushers)")}

  ${section(2, "Singleplayer maps")}
  ${experience("Scripting")}
  ${experience("Cinematics")}
  ${experience("Dialogue")}
  ${experience("Recorded animations")}
  ${experience("Device control groups")}
  ${experience("AI and encounter setup")}
  ${experience("AI behaviour and balancing strategies")}

  ${section(1, "Servers")}
  ${experience("Hosting dedicated servers")}
  ${experience("Server mods (e.g. SAPP)")}
  ${experience("Console commands and rcon")}

  ${section(1, "Programming and reverse engineering")}
  ${experience("Hooking/patching game code")}
  ${experience("Programmatically editing or creating tags with Reclaimer")}
  ${experience("Using Cheat Engine")}

  <hr>
  <p>Thanks for taking the time to fill out this survey! 💕 Results will be posted in Discord once the survey is complete.</p>
  <button type="submit">Submit</button>
  </form>
  <br>
`;

module.exports = {headings, body};
