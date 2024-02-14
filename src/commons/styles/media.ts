type DeviceType = "desktop" | "tablet" | "phone";

const sizes: Record<DeviceType, number> = {
  desktop: 1200,
  tablet: 768,
  phone: 600,
};
const device = {
  phone: `(max-width: ${sizes.phone}px)`,
  tablet: `(max-width: ${sizes.tablet}px)`,
  desktop: `(max-width: ${sizes.desktop}px)`,
};
export default device;
