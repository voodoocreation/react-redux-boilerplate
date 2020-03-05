import NextLink from "next/link";
import { withRouter } from "next/router";
import * as React from "react";

import Routes from "../../../../next.routes";

export interface IProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  isExternal?: boolean;
  params?: {};
  prefetch?: boolean;
  route?: string;
}

const Link: React.FC<IProps & { router: any }> = ({
  children,
  href,
  isExternal,
  params,
  prefetch,
  route,
  router,
  ...props
}) => {
  const externalAttrs: { target?: string; rel?: string } = {};

  if (isExternal) {
    externalAttrs.target = "_blank";
    externalAttrs.rel = "noopener noreferrer";
  }

  if (!href && !route) {
    return <span {...props}>{children}</span>;
  }

  if (
    !router ||
    !router.components ||
    Object.keys(router.components).length < 1
  ) {
    return (
      <a href={route || href} {...externalAttrs} {...props}>
        {children}
      </a>
    );
  }

  if (route) {
    return (
      <Routes.Link params={params} prefetch={prefetch} route={route}>
        <a {...externalAttrs} {...props}>
          {children}
        </a>
      </Routes.Link>
    );
  }

  return (
    <NextLink href={href!} prefetch={prefetch}>
      <a {...externalAttrs} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

Link.displayName = "Link";
Link.defaultProps = {
  isExternal: false,
  prefetch: false
};

export default withRouter(Link);
