function folder(tp) {
  const folders = tp.file.folder(true).split("/");
  const parentFolder = folders[folders.length - 1];
  return parentFolder
}
module.exports = folder;
