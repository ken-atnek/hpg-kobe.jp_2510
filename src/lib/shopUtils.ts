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

export const platinumMailUrlMap: Record<string, string> = {
  hot: 'https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/platinummail/?of=y',
  villa:'https://www.cityheaven.net/hyogo/A2802/A280201/koube_hp_part3/platinummail/?of=y',
};