"""Server info."""

import bottle


QUALITY_TIME_VERSION = "3.35.0-rc.5"


@bottle.get("/api/v3/server", authentication_required=False)
def get_server():
    """Return the server info."""
    return dict(version=QUALITY_TIME_VERSION)
