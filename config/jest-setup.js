import 'regenerator-runtime/runtime'


global.console.error = message => {
  // mostly related to proptypes errors
  // fail test if app code uses console.error
  throw new Error(message)
}

global.console.warn = message => {
  throw new Error(message)
}

const Environment = require('jest-environment-jsdom');

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
module.exports = class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder } = require('util');
            this.global.TextEncoder = TextEncoder;
        }
    }
}
