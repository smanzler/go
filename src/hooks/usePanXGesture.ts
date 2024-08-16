import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";

export const usePanXGesture = (
  onDelete: () => void,
  onComplete: () => void
) => {
  const offsetX = useSharedValue(0);
  const startX = useSharedValue(0);
  const dragDirectionShared = useSharedValue("none");

  const directionCalculated = useSharedValue(false);

  const initialTouchLocation = useSharedValue<{
    x: number;
    y: number;
  } | null>(null);

  const handlePanX = (e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    "worklet";
    const dragX = startX.value + e.translationX;
    offsetX.value = dragX;
  };

  const panXGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((e) => {
      initialTouchLocation.value = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
      };
      directionCalculated.value = false;
    })
    .onTouchesMove((evt, state) => {
      if (directionCalculated.value) return;

      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }
      const xDiff = Math.abs(
        evt.changedTouches[0].x - initialTouchLocation.value.x
      );
      const yDiff = Math.abs(
        evt.changedTouches[0].y - initialTouchLocation.value.y
      );
      const isHorizontalPanning = xDiff > yDiff * 2;
      if (isHorizontalPanning) {
        state.activate();
      } else {
        state.fail();
      }

      directionCalculated.value = true;
    })
    .onStart((e) => {
      startX.value = offsetX.value;
      const dragX = e.translationX + startX.value;
      dragDirectionShared.value =
        dragX > 0 ? "right" : dragX < 0 ? "left" : "none";
    })
    .onUpdate((e) => {
      handlePanX(e);
    })
    .onEnd(() => {
      if (offsetX.value > 100) {
        runOnJS(onComplete)();
      } else if (offsetX.value < -100) {
        runOnJS(onDelete)();
      }
      offsetX.value = withTiming(0);
    });

  return {
    offsetX,
    panXGesture,
  };
};
