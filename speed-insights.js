/* ==========================================================================
   Vercel Speed Insights Initialization
   ========================================================================== */

// Import the injectSpeedInsights function from the CDN
// Using jsDelivr CDN for reliable access to the Speed Insights package
import { injectSpeedInsights } from 'https://cdn.jsdelivr.net/npm/@vercel/speed-insights@2.0.0/dist/index.mjs';

// Initialize Speed Insights
// This will automatically track Web Vitals and performance metrics
// Note: Data is only collected in production (not in development mode)
injectSpeedInsights({
    debug: false, // Set to true for debugging in development
});

console.log('Vercel Speed Insights initialized');
