/** @type {import('next').NextConfig} */
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = { asyncWebAssembly: true, layers: true }
    // WebAssembly pack plugin configuration
    if (!isServer) {
      config.plugins.push(
        new WasmPackPlugin({
          crateDirectory: __dirname,
          outDir: 'pkg',
        })
      );
    }

    return config;
  },
}
 
module.exports = nextConfig