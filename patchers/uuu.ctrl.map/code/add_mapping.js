let dict_name;

function set(
  param_name,
  src,
  scale = "",
  never_hold = 0,
  flip = 0,
  ignore_values = "",
) {
  if (!dict_name) {
    error("No mapping dict found.\n");
    return;
  }
  let mapping = new Dict(dict_name);
  mapping = JSON.parse(mapping.stringify()); // stringify() here is a Max specific syntax

  if (mapping[param_name]) {
    let oldSrc = mapping[param_name].src;
    if (!oldSrc.includes(src)) {
      mapping[param_name].src = `${oldSrc} ${src}`;
    }
    if (mapping[param_name].never_hold && !never_hold) {
      delete mapping[param_name].never_hold;
    } else if (!mapping[param_name].never_hold && never_hold) {
      mapping[param_name].never_hold = never_hold;
    }
    if (scale && scale != "use default") {
      scale = String(scale);
      scale_arr = scale.split(" ");
      if (scale_arr.length == 4 || scale_arr.length == 5) {
        mapping[param_name].scale = scale_arr.map((v) => parseFloat(v));
      }
    } else {
      delete mapping[param_name].scale;
    }
    if (flip) {
      mapping[param_name].flip = flip;
    } else if (mapping[param_name].flip) {
      delete mapping[param_name].flip;
    }
    if (ignore_values !== "" && ignore_values != -1) {
      ignore_values = String(ignore_values);
      mapping[param_name].ignore_values = ignore_values
        .split(" ")
        .map((v) => parseFloat(v));
    } else if (mapping[param_name].ignore_values) {
      delete mapping[param_name].ignore_values;
    }
  } else {
    mapping[param_name] = { src: src };
    if (never_hold) {
      mapping[param_name].never_hold = never_hold;
    }
  }
  const output = new Dict();
  output.parse(JSON.stringify(mapping));
  outlet(0, "dictionary", output.name);
  post(
    "Mapping updated (",
    param_name,
    ": ",
    JSON.stringify(mapping[param_name]),
    ")\n",
  );
}

function dictionary(name) {
  dict_name = name;
}
