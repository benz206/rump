import { Config } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind-v4';
import path from 'node:path';
Config.setEntryPoint('src/remotion/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.overrideWebpackConfig(config => enableTailwind({...config,resolve:{...config.resolve,alias:{...config.resolve?.alias,'@':path.resolve('src')}}}));
