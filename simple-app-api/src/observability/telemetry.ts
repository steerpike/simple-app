const { NodeSDK } = require('@opentelemetry/sdk-node');
const { Resource } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } = require('@opentelemetry/semantic-conventions');
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { Console } from 'console';
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');


const traceExporter =
  new OTLPTraceExporter({
    url: "https://api.honeycomb.io/v1/traces", // US instance
    //url: "https://api.eu1.honeycomb.io/v1/traces", // EU instance
    headers: {
      "x-honeycomb-team": process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY,
    },
  });


const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'simple-app-api',
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
    new ExpressInstrumentation(),],
});

sdk.start();
