import { IEventService } from "../api/IEventService";
import { Inject } from "../../ioc";

export const sendEvent = (
  eventName: string,
  data: any,
  eventService: IEventService = Inject(IEventService)
): void =>
  eventService.publish({
    type: {
      key: eventName
    },
    data
  });
