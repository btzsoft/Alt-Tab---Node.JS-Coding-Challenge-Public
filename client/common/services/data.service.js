(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/v1/users/profile', {
        headers: {
          Authorization: authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();