(function(angular) {

  'use strict';

  angular.module('calcentral.services').service('authService', ['$http', '$route', '$timeout', 'utilService', function($http, $route, $timeout, utilService) {

    /**
     * Check whether the current user is logged in or not
     *
     * If they aren't AND they aren't on a public page, redirect them to the splash page.
     */
    var isLoggedInRedirect = function() {

      // We need a $timeout since we need to wait for the DOM to be ready
      // otherwise the back button doesn't trigger a new response
      $timeout(function() {
        $http.get('/api/my/am_i_logged_in').success(function(data) {
          if (data && !data.am_i_logged_in && $route && !$route.isPublic) {
            utilService.redirect('');
          }
        })
      }, 0);
    }

    // Expose methods
    return {
      isLoggedInRedirect: isLoggedInRedirect
    };

  }]);

}(window.angular));
