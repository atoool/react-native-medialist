import { NativeModules } from "react-native";

const { Medialist } = NativeModules;

export default {
  get(path, options) {
    return Medialist.get(path, {
      getThumb: true,
      ...options,
    });
  },
};
