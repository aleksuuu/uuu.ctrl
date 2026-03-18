function bang() {
  let p = this.patcher;
  while (p.parentpatcher) {
    p = p.parentpatcher;
  }
  let fullpath = p.getattr("filepath");
  outlet(0, fullpath.substring(0, fullpath.lastIndexOf("/") + 1));
}
