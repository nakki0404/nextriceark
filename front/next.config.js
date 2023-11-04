/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    REACT_APP_BACKEND_URL: "http://localhost:3001/api",
    // REACT_APP_BACKEND_URL:
    //   "https://port-0-nextriceark-2rrqq2bln0lh5vt.sel5.cloudtype.app/api",
  },
};

module.exports = nextConfig;
