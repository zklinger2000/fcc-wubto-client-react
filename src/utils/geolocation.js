"use strict";

export function geoFindMe() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({ code: -1, message: 'browser not supported'});
    }

    function success(position) {
      // console.log([position.coords.latitude, position.coords.longitude].toString());
      resolve([position.coords.latitude, position.coords.longitude]);
    }

    function error(err) {
      // console.log(err);
      // let results;
      //
      // switch (err.code) {
      //   case 1:
      //     console.log(err.message);
      //     break;
      //   default:
      //     break;
      // }
      // return err;
      reject(err);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  });
}

