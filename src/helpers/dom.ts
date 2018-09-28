export const isServer = () => typeof window === "undefined" || window.isServer;

export const isInViewport = (element?: HTMLElement | null) => {
  if (!element) {
    return false;
  }

  const html = document.documentElement as HTMLHtmlElement;
  const bounds = element.getBoundingClientRect();
  const viewport = {
    height: window.innerHeight || html.clientHeight,
    width: window.innerWidth || html.clientWidth
  };

  return (
    bounds.top >= 0 &&
    bounds.right <= viewport.width &&
    bounds.bottom <= viewport.height &&
    bounds.left >= 0
  );
};

export const isAlmostInViewport = (
  element?: HTMLElement | null,
  offset = 0
) => {
  if (!element) {
    return false;
  }

  const html = document.documentElement as HTMLHtmlElement;
  const bounds = element.getBoundingClientRect();
  const viewport = {
    height: window.innerHeight || html.clientHeight,
    width: window.innerWidth || html.clientWidth
  };

  return (
    viewport.height - bounds.top > -offset &&
    bounds.right > -offset &&
    bounds.bottom > -offset &&
    viewport.width - bounds.left > -offset
  );
};
