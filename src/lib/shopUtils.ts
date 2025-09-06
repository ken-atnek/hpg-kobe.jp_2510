export const storeIdMap: Record<string, string> = {
  hot: 'kbHot',
  villa: 'kbVilla',
};

export const logoHrefMap: Record<string, string> = {
  hot: '#svg_logoKobeHot',
  villa: '#svg_logoVilla',
};

export function getShopFromPath(pathname: string): string {
  return pathname.split('/')[1] || 'hot';
}

export function getStoreClass(shop: string): string {
  return storeIdMap[shop] || storeIdMap['hot'];
}

export function getLogoHref(shop: string): string {
  return logoHrefMap[shop] || logoHrefMap['hot'];
}
