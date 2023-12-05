# Sachet - React

This React version of the Sachet app demonstrates a very basic app built for Satchet. All your regular tools can work while building for Satchet.

## Table of Contents

- [Tool Versions](#tool-versions)
- [Available Scripts](#available-scripts)
- [Setting Up ADB](#setting-up-adb)

## Tool Versions

- **Node**: v20.5.1
- **NPM**: v9.8.0

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

This command runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload if you make edits, and you will also see any lint errors in the console.

### `npm test`

This launches the test runner in interactive watch mode. For more details on running tests, refer to the official.

### `npm run build`

This command builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include hashes. After this, your app is ready for deployment!

### `npm push`

This script is used to push your app, and it requires ADB (Android Debug Bridge) to be set up. ADB is a versatile command-line tool that lets you communicate with a device. It's essential for certain tasks, such as pushing apps to devices or emulators. [Learn more about setting up ADB below](#setting-up-adb).

## Put device in debug mode

To put your device in debug mode, dial `*#*#0574#*#*`, click on `Adb Debug` and click the checkbox to turn it on. A bug icon should now be displayed on device screen.

## Setting Up ADB

To run the `npm push` script, you need to have ADB set up on your system. Here's how to add ADB platform tools to your system path on a Mac:

### Download Platform Tools

1. **Download the Platform Tools**: If you haven't already, download the platform tools from the [Android Developer website](https://developer.android.com/studio/releases/platform-tools) and extract the ZIP File.

2. **Extract the ZIP File**: Once downloaded, you'll see a folder named `platform-tools`.

3. **Move the Folder**: Move the `platform-tools` folder to your system root. You can run `cd ~` in the terminal and move the downloaded folder here.

4. **Run ADB File**: Open the `platform-tools` folder and run the `adb` file. You would need to add `adb` to your **PATH**, refer to the [Add adb to PATH](#add-adb-to-path) section on how to do this.

5. **Verify Installation:**
   Restart your terminal. After restarting, type adb version and press Enter. This should display the version of ADB you've installed, indicating that it's been successfully installed.

   **Note**: You might need to allow your Mac to install apps from third-party sources. You can do this from the Privacy & Security settings on your Mac.

### Add adb to PATH

1. **For macOS Catalina and later**:

   ```bash
   echo 'export PATH=$PATH:/path_to_folder/platform-tools' >> ~/.zshrc
   source ~/.zshrc

   ```

1. **For macOS Mojave and earlier**:
   ```bash
   echo 'export PATH=$PATH:/path_to_folder/platform-tools' >> ~/.bash_profile
   source ~/.bash_profile
   ```

Replace `/path_to_folder/` with the actual path where you moved the platform-tools folder.