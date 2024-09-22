import "@testing-library/jest-dom";
import { TextEncoder } from "util";

// window.matchMedia

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// TextEncoder

Object.defineProperties(globalThis, {
  TextEncoder: { value: TextEncoder },
});
