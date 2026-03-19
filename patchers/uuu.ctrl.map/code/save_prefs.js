let filepath;

function loadbang() {
  filepath = _get_pref_file();
  let file = new File(filepath, "read");
  //   let fileAsString = "";
  //   let endFlag, oneChar;

  //   if (file.isopen) {
  //     // if file exists, send "read" to dict
  //     // endFlag = file.eof;
  //     // for (let i = 0; i < endFlag; i += 1) {
  //     //   oneChar = file.readchars(1);
  //     //   fileAsString += oneChar;
  //     // }
  //     // post("Loaded preference file: " + filepath + "\n");
  //     // post(fileAsString);
  //   }
  if (!file.isopen) {
    // if file doesn't exist, create one with "write"
    file = new File(filepath, "write", "TEXT");
    if (file.isopen) {
      const emptyjson = "{}";
      let onechar;
      for (let i = 0; i < emptyjson.length; i++) {
        onechar = emptyjson.charCodeAt(i);
        file.writebytes(onechar);
      }
      file.eof = emptyjson.length;
      post("Created new preference file: " + filepath + "\n");
      file.close();
    } else {
      post("Could not create new preference file: " + filepath + "\n");
      return;
    }
  }
  let tsk = new Task(function readdict() {
    outlet(0, "read", filepath);
    outlet(0, "write", filepath);
  });
  tsk.schedule(100);
}

function list(...elements) {
  const file = new File(filepath, "readwrite");
  if (!file.isopen) {
    post("Could not read or write to new preference file: " + filepath + "\n");
    return;
  }
}

function _get_data_dir() {
  let path = this.patcher.getattr("filepath");
  const sliceidx = path.lastIndexOf("/", path.lastIndexOf("/") - 1) + 1;
  path = path.substring(0, sliceidx);
  path += "data/prefs_";
  return path;
}

function _get_top_level_patcher() {
  let p = this.patcher;
  while (p.parentpatcher) {
    p = p.parentpatcher;
  }
  let path = p.getattr("filepath");
  path = path.replaceAll("/", "_fs_");
  path = path.replaceAll(":", "_colon_");
  path = path.replace(".maxpat", ".json");
  return path;
}

function _get_pref_file() {
  return _get_data_dir() + _get_top_level_patcher();
}
