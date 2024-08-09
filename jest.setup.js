// jest.setup.js

/* eslint-disable no-undef */

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

/* eslint-enable no-undef */
