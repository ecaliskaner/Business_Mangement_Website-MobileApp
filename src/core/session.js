// Shared UI cursors — which site/station/job the user is currently looking at.
//
// These are mutable and written from several modules (applyRoleAccess, the
// company-detail view, the mobile flow). They live on an object because an
// imported `let` binding is read-only for the importer: `import { x }` then
// `x = 1` is a TypeError. Mutating a property of a shared object is not.

export const ui = {
  activeSiteId: null,
  activeStationCode: null,
  mobJob: null,
  mobArrived: false,
  mobQrStarted: false,
  mobOfflineReady: false,
  activeMobileStationCode: null
};
