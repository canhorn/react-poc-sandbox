import { createSingletonService } from "./core/ioc";
import { IEventService } from "./core/event";
import { StandardEventService } from "./core/event/model/StandardEventService";
import { ILoggerFactory } from "./core/logger";
import { StandardLoggerFactory } from "./core/logger/factory/StandardLoggerFactory";

export const setupIoC = () => {
  // Setup Event Services
  createSingletonService(IEventService, StandardEventService);
  // Setup logger
  createSingletonService(ILoggerFactory, StandardLoggerFactory);
};
