import getScrollbarWidth from "scrollbar-size";

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

export const scrollState = {
  count: 0,
  left: 0,
  top: 0
};

export const lockScroll = () => {
  if (isServer()) {
    return;
  }

  const { body } = document;
  const html = document.documentElement as HTMLHtmlElement;

  scrollState.count += 1;

  if (!html.classList.contains("isLocked")) {
    const existingPadding = parseInt(
      getComputedStyle(body, null).getPropertyValue("padding-right"),
      10
    );
    const scrollbarWidth = getScrollbarWidth();
    const newPadding =
      Number.isNaN(existingPadding) || !Number.isFinite(existingPadding)
        ? scrollbarWidth
        : scrollbarWidth + existingPadding;
    const scrollElement =
      body.scrollTop > 0 || html.scrollTop === 0 ? body : html;

    scrollState.top = scrollElement.scrollTop;
    scrollState.left = scrollElement.scrollLeft;

    html.classList.add("isLocked");
    body.style.paddingRight = `${newPadding}px`;
  }
};

export const unlockScroll = () => {
  if (isServer()) {
    return;
  }

  const { body } = document;
  const html = document.documentElement as HTMLHtmlElement;

  if (scrollState.count <= 1 && html.classList.contains("isLocked")) {
    body.style.paddingRight = "";
    html.classList.remove("isLocked");
    window.scrollTo(scrollState.left, scrollState.top);
  }

  if (scrollState.count > 0) {
    scrollState.count -= 1;
  }
};
