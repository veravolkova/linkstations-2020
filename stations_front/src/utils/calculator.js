/**
 * Calculates the distance between a device and a station
 *
 * @param {Device} device Device to check
 * @param {Station} station Device to get distance to
 * @return {number} Distance from device to station
 */

const getDistance = (device, station) => {
  return Math.sqrt(Math.pow((device.latitude - station.latitude), 2) + Math.pow((device.longitude - station.longitude), 2))
}

/**
 * Calculates the power the device may get from the link station
 *
 * @param {number} reach Station reach
 * @param {number} distance Distance between device and station
 * @return {number} Power got from the link station
 */

const getPower = (reach, distance) => {
  return distance > reach ? 0 : Math.pow((reach - distance),2)
}

export default {
  getDistance,
  getPower
}



