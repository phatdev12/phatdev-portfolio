/** @type {import('next').NextConfig} */
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const withMDX = require('@next/mdx')()

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

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  runtime: 'edge',
}
 
module.exports = withMDX(nextConfig);