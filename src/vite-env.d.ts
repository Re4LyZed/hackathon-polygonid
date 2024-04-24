/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly POLYGON_API_URL: string;
    readonly POLYGON_API_USER: string;
    readonly POLYGON_API_PASSWORD: string;
    // Declare other environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }