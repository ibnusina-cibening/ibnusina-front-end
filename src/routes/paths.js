// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, "/one"),
    posts: path(ROOTS_DASHBOARD, "/posts"),
    pageThree: path(ROOTS_DASHBOARD, "/three"),
    newpost: path(ROOTS_DASHBOARD, "/newpost"),
    pageFive: path(ROOTS_DASHBOARD, "/five"),
    pageSix: path(ROOTS_DASHBOARD, "/six"),
  }
};


export {PATH_DASHBOARD};
