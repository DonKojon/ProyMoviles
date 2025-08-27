import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'tienda',
  webDir: 'dist/frontend-/browser',
  server: {
    androidScheme: 'http',
    cleartext:  true,
    allowNavigation: ['192.168.1.13'],
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;

