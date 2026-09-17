# NMS visualization behavior

- Built-in devices use a common rounded chassis, a type-specific lid symbol, and front-panel details. Nearby devices show a type abbreviation; hover and the detail panel show the full type. Custom geometry remains supported.
- Device surface color communicates status, independently of type. The status legend lists the symbols and counts for the current floor (all sites in campus view). These counts are not reduced by search filters. Alerts explicitly lists all sites and has its own severity filter.
- The colorblind palette updates device instances, status badges, the legend, alert rows, toolbar counters, details, minimap, campus view, and offscreen indicators. Shape and text remain available alongside color.
- Rack names are culled in screen space when they collide with another name, an alarm/search badge, or screen controls. Names crossing the viewport edge are hidden. Zoom in or select a rack in the space tree to inspect it; selected names take priority over other space names. This does not remove devices or alarms.
- Top view and 3D view change the camera angle around the current target. Floor slabs, a subtle floor grid, and device shadows provide depth cues.
- The SDK fills its host container. Give the container an explicit width and height (or a definite size via layout). In short containers, camera controls use two columns and the status legend starts collapsed; it can still be expanded.

No public API changes are required for these improvements.
