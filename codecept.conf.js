exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Appium: 
      {
      app: '/Users/eduardofinotti/Desktop/DeliveryMuchDevSimulatorTDC.app',
      platform: 'iOS',
      desiredCapabilities: {
        platformVersion: "12.2",
        deviceName: "iPhone Xʀ",
        //udid: "b5943963e64d4a62ffd531ccce78837698763307",
      }
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'tdc-project'
}

