"use client"; // Ensure the component is client-side
import { useEffect } from 'react';
import { HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';


const configDefaults = {
  ignoreNetworkEvents: true,
  enabled: true,
  propagateTraceHeaderCorsUrls: [
    /.+/g,
  ],
};

export default function Observability() {
  useEffect(() => {
    try {
      const sdk = new HoneycombWebSDK({
        // endpoint: "https://api.honeycomb.io/v1/traces",
        endpoint: "https://0.0.0.0:4318", // Otel Collector
        debug: true,
        apiKey: process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY,
        serviceName: 'simple-app-client',
        instrumentations: [
          getWebAutoInstrumentations({
            '@opentelemetry/instrumentation-xml-http-request': configDefaults,
            '@opentelemetry/instrumentation-fetch': configDefaults,
            '@opentelemetry/instrumentation-document-load': configDefaults,
          }),
        ],
      });
      sdk.start();
      window.dispatchEvent(new Event('otelReady'));
    } catch (e) {
      console.error('Error initializing Honeycomb SDK:', e);
    }
  }, []); // Empty dependency array ensures this runs once on mount
  return null;
}
