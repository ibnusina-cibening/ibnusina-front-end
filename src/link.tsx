// import React from 'react';

// type Props = { children: React.ReactNode; type: "submit" | "button" };
// type Ref = HTMLButtonElement;

// const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
//   <button ref={ref}>
//     {props.children}
//   </button>
// ));
 // const ref = React.createRef<HtmlProps>();
//  <FancyButton type = {'button'} ref={ref}>Click me!</FancyButton>;

// export default FancyButton;

import * as React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
// import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});
type Props = {children:React.ReactNode; type: 'anchor'};
type Ref = HTMLAnchorElement;

// type Props
// interface NextProps {
//   to:string,
//   linkAs:string,
//   href:string,
//   replace:boolean,
  
// }
export const NextLinkComposed : FC<any> = React.forwardRef<Ref, Props>(function NextLinkComposed(props:any, ref:any):JSX.Element{
  const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

// NextLinkComposed.propTypes = {
//   href: PropTypes.any,
//   linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   locale: PropTypes.string,
//   passHref: PropTypes.bool,
//   prefetch: PropTypes.bool,
//   replace: PropTypes.bool,
//   scroll: PropTypes.bool,
//   shallow: PropTypes.bool,
//   to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
// };

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link

interface MyProps{
  activeClassName:string,
  href:string,
  as:string,
  className:string,
  noLinkStyle:string,
  role:string
}

const Link : FC<MyProps> = React.forwardRef(function Link(props, ref):JSX.Element {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role, // Link don't have roles.
    ...other
  } = props;

  const router = useRouter();
  // const pathname = typeof href === 'string' ? href : href.pathname;
  // const className = clsx(classNameProps, {
  //   [activeClassName]: router.pathname === pathname && activeClassName,
  // });

  const isExternal =
    typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  // if (isExternal) {
  //   if (noLinkStyle) {
  //     return <Anchor type ={'anchor'} className={className} href={href} ref={ref} {...other} />;
  //   }

  //   return <MuiLink className={className} href={href} ref={ref} {...other} />;
  // }

  // if (noLinkStyle) {
  //   return <NextLinkComposed  type = {'anchor'} className={className} ref={ref} to={href} {...other} />;
  // }

  return (
    // <MuiLink
    //   component={NextLinkComposed}
    //   linkAs={linkAs}
    //   className={className}
    //   ref={ref}
    //   to={href}
    //   {...other}
    // />
    <>hello</>
  );
});

// Link.propTypes = {
//   activeClassName: PropTypes.string,
//   as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   className: PropTypes.string,
//   href: PropTypes.any,
//   linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   noLinkStyle: PropTypes.bool,
//   role: PropTypes.string,
// };

export default Link;