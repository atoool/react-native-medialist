import { NativeModules, Platform, PermissionsAndroid } from "react-native";

const MediaStore = NativeModules.Medialist;

const Medialist = {
  /**
   * Get Assets from the gallery
   * @param {object} params           Object with params
   * @param {string} params.type      Type of the asset. Can be - image, video, all
   * @param {number} params.limit     Number of assets returned
   * @param {number} params.startFrom From which index to start
   * @param {string} params.albumName If requesting items from album -> set the album name
   */
  getAssets(params) {
    return Mediastore.getAssets(params);
  },

  /**
   * To Request authorization for access photos
   * returns Promise
   */
  requestAuthorization(title, message) {
    if (Platform.OS === "ios") {
      return Mediastore.requestAuthorization();
    } else {
      return new Promise(async (resolve, reject) => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: title,
            message: message,
          }
        );

        // On devices before SDK version 23, the permissions are automatically granted if they appear in the manifest,
        // so check and request should always be true.
        // https://github.com/facebook/react-native-website/blob/master/docs/permissionsandroid.md
        const isAuthorized =
          Platform.Version >= 23
            ? granted === PermissionsAndroid.RESULTS.GRANTED
            : granted === true;

        if (isAuthorized) {
          resolve({ isAuthorized: true });
        } else {
          resolve({ isAuthorized: false });
        }
      });
    }
  },

  /**
   * Get List with album names
   */
  getAlbums() {
    return Mediastore.getAlbums();
  },

  /**
   * Convert video
   */
  convertVideo(params) {
    return Mediastore.convertVideo(params);
  },
};

export { Medialist };
