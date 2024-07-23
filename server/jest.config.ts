import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Remove or comment out the line below if you don't have a setup file
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;
