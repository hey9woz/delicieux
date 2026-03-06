import { BackHandler } from "react-native";

type BackHandlerSubscription = { remove: () => void };
type BackHandlerFn = (...args: any[]) => any;

const hasRemoveEventListener =
  typeof (BackHandler as any).removeEventListener === "function";

if (!hasRemoveEventListener) {
  const originalAddEventListener = BackHandler.addEventListener.bind(
    BackHandler
  ) as BackHandlerFn;

  const handlerSubscriptions = new WeakMap<
    BackHandlerFn,
    Map<string, BackHandlerSubscription>
  >();

  (BackHandler as any).addEventListener = (
    eventName: string,
    handler: BackHandlerFn
  ) => {
    const subscription = originalAddEventListener(
      eventName,
      handler
    ) as BackHandlerSubscription;

    let perHandler = handlerSubscriptions.get(handler);
    if (!perHandler) {
      perHandler = new Map();
      handlerSubscriptions.set(handler, perHandler);
    }
    perHandler.set(eventName, subscription);

    return subscription;
  };

  (BackHandler as any).removeEventListener = (
    eventName: string,
    handler: BackHandlerFn
  ) => {
    const perHandler = handlerSubscriptions.get(handler);
    const subscription = perHandler?.get(eventName);
    subscription?.remove?.();
    perHandler?.delete(eventName);
  };
}

