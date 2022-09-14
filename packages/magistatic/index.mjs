// src/index.ts
function createStaticServer(config) {
  return (req, res) => {
    console.log(req.path);
  };
}
export {
  createStaticServer as default
};
