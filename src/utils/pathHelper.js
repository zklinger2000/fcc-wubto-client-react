//============================================================================
class PathHelper {
//----------------------------------------------------------------------------
// getBasePath - returns the first child of a path or 'root' for '/'
// @@ path: long pathname as a String
//============================================================================
  static getBasePath(path) {
    if (path === '/' || typeof path === 'undefined') {
      return 'home';
    } else if (path.split('/').length === 3) {
      return path;
    } else if (path.length > 1 && path[0] === '/') {
      return path.split('/')[1];
    }
    return path.split('/')[0];
  }
}

export default PathHelper;
