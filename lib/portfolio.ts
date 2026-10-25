import contentJson from './portfolio-content.json';

const withBasePath = (value: string) => {
  if (!value.startsWith('/')) return value;
  return `${process.env.NODE_ENV === 'production' ? '/lanify_portfolio' : ''}${value}`;
};

const content = {
  ...contentJson,
  sketches: contentJson.sketches.map((sketch) => ({
    ...sketch,
    image: withBasePath(sketch.image),
  })),
};

export { content };
export type Project = (typeof content.projects)[number];
export type Sketch = (typeof content.sketches)[number];
export const assets = {
  grain: withBasePath('/figma/7cd24230eac47c185561ce5ba791589a4a408bc4.png'),
  portrait: withBasePath('/figma/040989a9f37f1bf219d94d775eba1fd2ed32afe1.jpg'),
  barcode: withBasePath('/figma/916ffbf567e7f313c059ae101918edac9fefcc40.png'),
  studio: withBasePath('/figma/699a02bdc2aa82b64766bc7c6a8b00d28bf5b65b.png'),
  studioVideo: withBasePath('/figma/fabric_workers.0.mp4'),
  process: withBasePath('/figma/3af63eba3fe81512ea6dd0885a55ef9ef732fff5.png'),
  processVideo: withBasePath('/figma/TDMovieOut.0.mp4'),
  ornamentVideo: withBasePath('/figma/ornament-animated-3-5s.mp4'),
  ornament: withBasePath('/figma/495dfeefd2fca7f19aa9dfc165e77fdb6cfd1341.png'),
};
