const { NodeSDK } = require('@opentelemetry/sdk-node');
const { Resource } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } = require('@opentelemetry/semantic-conventions');
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');


const traceExporter =
  new OTLPTraceExporter({
    // url: "https://api.honeycomb.io/v1/traces", // US instance
    url: "https://0.0.0.0:4318", // Otel Collector
  });


const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'simple-app-identity',
    [ATTR_SERVICE_VERSION]: '1.0',
  }),
  traceExporter: traceExporter,
  // traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});
console.log("Starting sdk")
sdk.start();
