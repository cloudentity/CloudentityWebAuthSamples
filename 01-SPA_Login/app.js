window.addEventListener('load', function() {

  // helpers

  var loginButton = document.getElementById('login-button');

  var logoutButton = document.getElementById('logout-button');

  var unauthorizedNav = document.getElementById('unauthorized-nav');

  var auhtorizedNav = document.getElementById('authorized-nav');

  var unauthorizedSection = document.getElementById('unauthorized-section');

  var auhtorizedSection = document.getElementById('authorized-section');

  function updateUI (auth) {
    if (!auth) {
      console.log('no auth');
      auhtorizedNav.style.display = 'none';
      auhtorizedSection.style.display = 'none';
      unauthorizedNav.style.display = 'block';
      unauthorizedSection.style.display = 'block';
    } else {
      auhtorizedNav.style.display = 'block';
      auhtorizedSection.style.display = 'block';
      unauthorizedNav.style.display = 'none';
      unauthorizedSection.style.display = 'none';
    }
  }


  // Cloudentity Web Auth usage

  var cloudentity = new CloudentityWebAuth({
    domain: CLOUDENTITY_SETTINGS.domain,
    clientId: CLOUDENTITY_SETTINGS.clientId,
    tenantId: CLOUDENTITY_SETTINGS.tenantId,
    authorizationServerId: CLOUDENTITY_SETTINGS.authorizationServerId,
    redirectUri: CLOUDENTITY_SETTINGS.redirectUri,
    scopes: CLOUDENTITY_SETTINGS.scopes
  });

  function login() {
    cloudentity.authorize();
  }

  function logout() {
    cloudentity.revokeAuth();
    updateUI(false);
  }

  loginButton.addEventListener('click', login);

  logoutButton.addEventListener('click', logout);


  cloudentity.getAuth().then(
    function (auth) {
      if (window.location.href.split('?').length > 1) {
        window.location.href = window.location.href.replace(/\?.*$/, '');
      }
      updateUI(true);
    },
    function (err) {
      updateUI(false);
      if (window.location.href.split('?error').length > 1) {
        var errorHintUrlParam = window.location.href.split('&error_hint=').length > 1 && window.location.href.split('&error_hint=')[1];
        var errorHint = errorHintUrlParam && errorHintUrlParam.split('&')[0].replace(/\+/g, ' ');
        window.alert('The authorization server returned the following error: ' + errorHint || 'unknown error');
        window.location.href = window.location.href.replace(/\?.*$/, '');
      }
      Promise.resolve();
    }
  );
});
