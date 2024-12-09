<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
    <!-- Reusable TopBar Component -->
    <TopBar />

    <!-- Hero Section -->
    <div class="relative flex flex-col items-center text-center py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <img
        src="@/assets/logo.png"
        alt="Shield Logo"
        class="w-36 h-36 mb-6 rounded-full border-4 border-ligtgrey shadow-lg hover:scale-105 transition-transform duration-300"
        style="background-color: white;"
      >
      <h1 class="text-5xl font-extrabold mb-6 tracking-tight">
        Welcome to EarDefender
      </h1>
      <p class="text-xl max-w-3xl font-light leading-relaxed">
        Ever stumbled upon an audio file online and thought, “Is this real or just another deepfake?” You’re not alone. In today’s world, deepfake audio is becoming harder to detect, and distinguishing truth from manipulation is more important than ever. That’s why we created <strong>EarDefender</strong> – your go-to tool for uncovering the truth behind audio files.
      </p>
    </div>

    <!-- Why EarDefender Section -->
    <div class="py-20 px-8 lg:px-24 bg-white">
      <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Why Choose EarDefender?
      </h2>
      <p class="text-lg text-gray-700 max-w-4xl mx-auto text-center leading-relaxed">
        Navigating the internet with so much uncertainty is tough. Whether you’re verifying a news clip or a social media post, EarDefender equips you to:
      </p>
      <ul class="text-lg text-gray-700 mt-8 max-w-4xl mx-auto list-disc list-inside space-y-4">
        <li>Shield yourself from misinformation.</li>
        <li>Make well-informed decisions about what you hear.</li>
        <li>Take control of your online experience with confidence.</li>
      </ul>
    </div>

    <!-- What Does EarDefender Do Section -->
    <div class="py-20 px-8 lg:px-24 bg-gray-50">
      <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-16">
        What Can EarDefender Do?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="bg-white shadow-md p-8 rounded-lg flex flex-col items-center text-center transition-shadow hover:shadow-xl">
          <div class="text-blue-500 text-5xl mb-6">
            <i class="fas fa-download" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Download & Analyze
          </h3>
          <p class="text-gray-600">
            Extract audio files directly from web pages and assess their authenticity seamlessly.
          </p>
        </div>
        <div class="bg-white shadow-md p-8 rounded-lg flex flex-col items-center text-center transition-shadow hover:shadow-xl">
          <div class="text-indigo-500 text-5xl mb-6">
            <i class="fas fa-microphone" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Spot Deepfake Segments
          </h3>
          <p class="text-gray-600">
            Pinpoint specific sections of an audio file that might be synthetic or manipulated.
          </p>
        </div>
        <div class="bg-white shadow-md p-8 rounded-lg flex flex-col items-center text-center transition-shadow hover:shadow-xl">
          <div class="text-green-500 text-5xl mb-6">
            <i class="fas fa-search" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Explore Confidently
          </h3>
          <p class="text-gray-600">
            Adjust search parameters for in-depth exploration, ensuring robust content verification.
          </p>
        </div>
      </div>
    </div>

    <!-- How It Works Section -->
    <div class="py-20 px-8 lg:px-24 bg-gradient-to-r from-indigo-50 to-blue-100">
      <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-16">
        How It Works
      </h2>
      <div class="max-w-5xl mx-auto space-y-8">
        <div class="flex items-start space-x-6">
          <div class="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold shadow-md">
            1
          </div>
          <p class="text-gray-700 text-lg">
            <strong>Share a Link:</strong> Provide the URL to a web page, and EarDefender will automatically detect audio files—no need to upload anything.
          </p>
        </div>
        <div class="flex items-start space-x-6">
          <div class="bg-indigo-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold shadow-md">
            2
          </div>
          <p class="text-gray-700 text-lg">
            <strong>Analyze:</strong> Relax as our advanced AI inspects the audio files for signs of deepfake manipulation.
          </p>
        </div>
        <div class="flex items-start space-x-6">
          <div class="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold shadow-md">
            3
          </div>
          <p class="text-gray-700 text-lg">
            <strong>Review Results:</strong> Get a comprehensive report highlighting authenticity and any suspicious segments.
          </p>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="py-20 px-8 lg:px-24 bg-gray-100">
      <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-16">
        FAQ: Frequently Asked Questions
      </h2>
      <div class="max-w-5xl mx-auto space-y-8">
        <div class="bg-white shadow-md p-6 rounded-lg">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            What parameters can I adjust?
          </h3>
          <ul class="text-gray-700 text-base space-y-2">
            <li><strong>Chosen Model:</strong> Select the AI model for analysis.</li>
            <li><strong>Search Depth:</strong> Set how deep EarDefender explores linked pages.</li>
            <li><strong>Maximum Pages:</strong> Limit the number of pages visited.</li>
            <li><strong>Maximum Files:</strong> Specify the number of audio files analyzed.</li>
            <li><strong>Analysis Time:</strong> Restrict total analysis time for efficient resource use.</li>
          </ul>
        </div>

        <div class="bg-white shadow-md p-6 rounded-lg">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            What models does EarDefender use?
          </h3>
          <ul class="text-gray-700 text-base space-y-2">
            <li><strong>SSL-wav2vec:</strong> Highly accurate but requires more time for analysis.</li>
            <li><strong>MesoNet with LFCC:</strong> A faster model for quick analysis, with slightly less accuracy.</li>
          </ul>
        </div>

        <div class="bg-white shadow-md p-6 rounded-lg">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            What are the statuses of an analysis?
          </h3>
          <ul class="text-gray-700 text-base space-y-2">
            <li><strong>Scraping:</strong> Scanning the page for audio files.</li>
            <li><strong>Processing:</strong> Analyzing discovered files with the selected model.</li>
            <li><strong>Finished:</strong> Analysis complete with results available.</li>
          </ul>
        </div>

        <div class="bg-white shadow-md p-6 rounded-lg">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            Why might a real file be marked as a deepfake?
          </h3>
          <p class="text-gray-700 text-base">
            Factors like background noise, low quality, or unique sounds may cause false positives. While accuracy is high, challenges in audio conditions can lead to errors.
          </p>
        </div>

        <div class="bg-white shadow-md p-6 rounded-lg">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            Does the model always provide accurate results?
          </h3>
          <p class="text-gray-700 text-base">
            While highly reliable, no AI system is perfect. EarDefender aids decision-making but should be used alongside other tools for comprehensive verification.
          </p>
        </div>

        <div class="bg-white shadow-md p-6 rounded-lg">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            Why might links in the analysis not work?
          </h3>
          <p class="text-gray-700 text-base">
            Temporary or browser-session-dependent resources might result in broken links. Future updates aim to address this issue.
          </p>
        </div>

        <div class="bg-white shadow-md p-6 rounded-lg">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            Is this the final version of EarDefender?
          </h3>
          <p class="text-gray-700 text-base">
            No, we’re constantly improving EarDefender to enhance accuracy, add features, and ensure a better user experience. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";

export default {
  name: "LandingPage",
  components: {
    TopBar,
  },
};
</script>

<style scoped>
/* Add smooth transitions and hover effects for interactive elements */
a:hover, button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}
</style>
