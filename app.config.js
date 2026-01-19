export default {
  name: "Stack Rush",
  slug: "stack-rush",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/logoicon.png",
  scheme: "stackrush",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#1a1a2e"
  },
  assetBundlePatterns: ["**/*"],
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/logoicon.png"
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.stackrush.app",
    buildNumber: "1"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/logoicon.png",
      backgroundColor: "#1a1a2e"
    },
    package: "com.stackrush.app",
    versionCode: 1
  },
  plugins: [
    "expo-router"
  ],
  experiments: {
    typedRoutes: true,
    baseUrl: "/stack-rush"
  },
  extra: {
    revenueCatApiKeyIos: process.env.REVENUECAT_IOS_KEY || "appl_PLACEHOLDER",
    revenueCatApiKeyAndroid: process.env.REVENUECAT_ANDROID_KEY || "goog_PLACEHOLDER"
  }
};
