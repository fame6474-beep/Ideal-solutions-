export const constructionConfig = {
  // Option 1: True Photographic Image Sequence
  sequence: {
    frameCount: 40,
    // Using locally generated 40 frames for technical testing.
    framePath: (index: number) => `/images/construction/roof-${index.toString().padStart(3, '0')}.jpg`,
  }
};
