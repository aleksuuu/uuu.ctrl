function dictionary(dict_name) {
  let mapping = new Dict(dict_name);
  mapping = JSON.parse(mapping.stringify()); // stringify() here is a Max specific syntax
  const mirror = {};

  for (const [param_name, val] of Object.entries(mapping)) {
    const controls = val.src.split(" ");
    for (const control of controls) {
      if (!mirror[control]) {
        mirror[control] = [];
      }
      const controlDetails = { param_name: param_name };
      if (val.scale) {
        controlDetails["scale"] = val.scale;
      }
      if (val.never_hold) {
        controlDetails["never_hold"] = val.never_hold;
      }
      if (val.flip) {
        controlDetails["flip"] = val.flip;
      }
      if (val.ignore_values) {
        controlDetails["ignore_values"] = val.ignore_values;
      }
      mirror[control].push(controlDetails);
    }
  }
  const output = new Dict();
  output.parse(JSON.stringify(mirror));
  outlet(0, "dictionary", output.name);
}

// function dictionary(dict_name) {
//   const mapping = new Dict(dict_name);
//   const mirror = { cc: {}, note: {}, key: {} };

//   let cc = mapping.get("cc").stringify();
//   cc = JSON.parse(cc);

//   for (const [midinum, midinumval] of Object.entries(cc)) {
//     for (const [midichan, midichanval] of Object.entries(midinumval)) {
//       mirror.cc[midichanval["param_name"]] = {
//         src: `cc${midinum}ch${midichan}`,
//         scale: midichanval["scale"],
//       };
//     }
//   }
//   const output = new Dict();
//   output.parse(JSON.stringify(mirror));
//   outlet(0, "dictionary", output.name);
// }
