/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GUARDIAN_API_KEY: string;
    readonly VITE_NEWS_API_KEY: string;
    readonly VITE_NYT_API_KEY: string;
    readonly VITE_API_URL: string;
    // add more env variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}