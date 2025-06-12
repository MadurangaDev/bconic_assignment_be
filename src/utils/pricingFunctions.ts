export const calculateShippingCost = ({
  weightKg,
  lengthCm,
  widthCm,
  heightCm,
}: {
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}): number => {
  const volumeCm3 = lengthCm * widthCm * heightCm;

  // Base pricing by weight
  let price = 0;

  if (weightKg <= 2) {
    price = 400;
  } else if (weightKg <= 6) {
    price = 800;
  } else if (weightKg <= 15) {
    price = 1000;
  } else if (weightKg <= 30) {
    price = 2500;
  } else {
    price = 2500 + (weightKg - 30) * 300;
  }

  // Volume-based pricing
  const volumeThreshold = 226534.773;
  const extraVolumeUnit = 28316.8466;
  const extraVolumeCost = 100;

  if (volumeCm3 > volumeThreshold) {
    price = price;
    const extraVolume = volumeCm3 - volumeThreshold;
    const extraUnits = Math.ceil(extraVolume / extraVolumeUnit);
    price += extraUnits * extraVolumeCost;
  }

  return price;
};
