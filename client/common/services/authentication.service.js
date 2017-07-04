(function () {

  angular
  .module('meanApp')
  .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function () {
      var token = getToken();
      var payload;

      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function () {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email: payload.email,
          name: payload.name
        };
      }
    };

    register = function (user) {
      return $http.post('/api/v1/users/signup', user).success(function (data) {
        saveToken(data.token);
      });
    };

    login = function (user) {
      return $http.post('/api/v1/users/signin', user).success(function (data) {
        saveToken(data.token);
      });
    };

    logout = function () {
      if (isLoggedIn()) {
        return $http.post('/api/v1/users/logout', {}, {
          headers: {
            Authorization: getToken()
          }
        }).success(function () {
          $window.localStorage.removeItem('mean-token');
        });
      } else {
        return false;
      }
    };

    return {
      currentUser: currentUser,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      register: register,
      login: login,
      logout: logout
    };
  }


})();