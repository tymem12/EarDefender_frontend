export default {
    limits: {
      depth: { min: 1, max: 5 },
      maxFiles: { min: 1, max: 50 },
      maxPages: { min: 1, max: 1000 },
      maxTimePerFile: { min: 1, max: 120 },
      maxTotalTime: { min: 1, max: 3600 },
    },
    defaults: {
        depth: 2,
        maxFiles: 10,
        maxPages: 30,
        maxTimePerFile: 120,
        maxTotalTime: 1200,
        model: "mesonet",
    },
    models: [
      "mesonet",
      "wav2vec",
    ],
  };
  