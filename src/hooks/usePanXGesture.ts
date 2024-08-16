import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";

export const usePanXGesture = () => {
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
      console.log(xDiff, yDiff);
      const isHorizontalPanning = xDiff > yDiff;
      if (isHorizontalPanning) {
        state.activate();
      } else {
        state.fail();
      }

      directionCalculated.value = true;
    })
    .onStart((e) => {
      const dragX = e.translationX + startX.value;
      dragDirectionShared.value =
        dragX > 0 ? "right" : dragX < 0 ? "left" : "none";
    })
    .onUpdate((e) => {
      handlePanX(e);
    })
    .onEnd(() => {
      startX.value = offsetX.value;
    });

  const panXAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value,
        },
      ],
    };
  }, []);

  return {
    panXAnimatedStyles,
    panXGesture,
  };
};
