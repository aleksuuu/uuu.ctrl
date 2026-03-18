function dictionary(dict_name) {
  let paramsInfo = new Dict(dict_name);

  paramsInfo = JSON.parse(paramsInfo.stringify());

  for (const [param_name, val] of Object.entries(paramsInfo)) {
    if (val.initial != undefined && val.initial != null) {
      const normalized =
        ((val.initial - val.min) / (val.max - val.min)) ** (1 / val.exponent);
      outlet(0, `/${param_name}`, normalized);
    }
  }
}
