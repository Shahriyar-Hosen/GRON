module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
