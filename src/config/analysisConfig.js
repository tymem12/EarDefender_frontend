export default {
    limits: {
      depth: { min: 1, max: 10 },
      maxFiles: { min: 1, max: 500 },
      maxPages: { min: 1, max: 100 },
      maxTimePerFile: { min: 1, max: 600 },
      maxTotalTime: { min: 1, max: 3600 },
    },
    defaults: {
        depth: 3,
        maxFiles: 100,
        maxPages: 30,
        maxTimePerFile: 300,
        maxTotalTime: 1200,
        model: "mesonet",
    },
    models: [
      "mesonet",
      "wav2vec",
    ],
  };
  