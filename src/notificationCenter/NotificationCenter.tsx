import "./NotificationCenter.css";
import * as React from "react";
import { Inject } from "../core/ioc";
import { IEventService } from "../core/event";

interface IProps {}
interface IState {}

export default class NotificationCenter extends React.Component<
  IProps,
  IState
> {
  state: IState = {};

  private readonly _eventService: IEventService = Inject(IEventService);

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return <div className="notification-center" />;
  }
}
