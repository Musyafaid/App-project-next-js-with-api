/** @type {import('next').NextConfig} */
const nextConfig = {
    // middleware: {
    //     '/dashboard': {
    //       // Middleware ini hanyaWAW berlaku untuk rute '/' (home page)
    //       function: './middleware.ts',
    //     },
    // },

    experimental: {
      serverActions: true,
    },

    api: {
      bodyParser: {
        sizeLimit: '100mb', // Adjust file size limit as needed (e.g., 10MB)
      },
    },
  };
  
  module.exports = nextConfig;
  